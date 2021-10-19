import {
  useAlert,
  useDataMutation,
  useDataQuery,
  useDataEngine,
} from "@dhis2/app-runtime";
import { useD2 } from "@dhis2/app-runtime-adapter-d2";
import i18n from "@dhis2/d2-i18n";
import SharingDialog from "@dhis2/d2-ui-sharing-dialog";
import {
  Button,
  ButtonStrip,
  Card,
  CircularLoader,
  InputFieldFF,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
  IconArrowLeft24,
  IconCalendar16,
  IconDashboardWindow16,
  IconLocation16,
  IconShare16,
  IconView16,
  IconVisualizationArea16,
  Tag,
  hasValue,
  ReactFinalForm,
} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { appConfig } from "../app.config.js";
import MapPlugin from "../plugins/MapPlugin";
import VisualizationItemPlugin from "../plugins/VisualizationItemPlugin";
import {
  typeQuery,
  visualizationQuery,
  mapQuery,
  dashboardQuery,
  deleteMutation,
  saveMutation,
  deleteMapMutation,
  saveMapMutation,
  deleteDashboardMutation,
  saveDashboardMutation,
} from "../queries/queries";
import getFilteredVisualization from "../services/getFilteredVisualization";
import CodeIcon from "./CodeIcon";
import ContentTable from "./ContentTable";

const ItemDetails = ({
  id,
  type,
  metadata,
  sharingData,
  setVisName,
  visName,
}) => {
  const { Field, Form } = ReactFinalForm;
  const { d2 } = useD2();
  const [sharingDialogOpen, setSharingDialogOpen] = useState(false);
  const [sharingInfo, setSharingInfo] = useState(sharingData);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const { show: showError } = useAlert((errorMsg) => errorMsg, {
    duration: 2000,
    critical: true,
  });

  const { show: showSuccess } = useAlert((successMsg) => successMsg, {
    duration: 2000,
    success: true,
  });

  const onSuccessfulDelete = () => {
    showSuccess(
      i18n.t("{{favoriteName}} has been deleted", {
        favoriteName: metadata.name,
      })
    );
    setTimeout(() => {
      window.location.href = "#";
    }, 1000);
  };
  const onErrorDelete = (error) => {
    showError(`${i18n.t("Could not delete")}: ${error.message}`);
  };
  const [deleteFavorite, { loading: deleteLoading }] = useDataMutation(
    type === "map"
      ? deleteMapMutation
      : type === "visualization"
      ? deleteMutation
      : deleteDashboardMutation,
    {
      variables: { id },
      onComplete: onSuccessfulDelete,
      onError: onErrorDelete,
    }
  );

  const [saveFavorite, { loading: saveLoading }] = useDataMutation(
    type === "map"
      ? saveMapMutation
      : type === "visualization"
      ? saveMutation
      : saveDashboardMutation,
    {
      onComplete: () => {
        showSuccess(i18n.t("Save successful"));
      },
      onError: (error) => {
        showError(`${i18n.t("Could not save")}: ${error.message}`);
      },
    }
  );

  const onSave = async (values) => {
    const saveFields = { name: "name" };

    const saveData = {};
    Object.keys(saveFields).forEach((k) => {
      if (values[k] !== metadata[saveFields[k]]) {
        saveData[k] = values[k];
      }
    });
    await saveFavorite({ id, data: saveData });

    // assumes we only get here if request succeeds
    if (Object.keys(saveData).includes("name")) {
      setVisName(saveData.name);
    }
  };

  return (
    <>
      {sharingDialogOpen && (
        <SharingDialog
          d2={d2}
          id={id}
          type={type}
          open={sharingDialogOpen}
          onRequestClose={(updatedSharing) => {
            setSharingInfo({ ...sharingInfo, object: updatedSharing });
            setSharingDialogOpen(false);
          }}
          insertTheme={true}
        />
      )}
      {deleteConfirmOpen && (
        <Modal
          onClose={() => {
            setDeleteConfirmOpen(false);
          }}
          position="middle"
        >
          <ModalTitle>
            {i18n.t("Confirm delete of {{name}}", { name: visName })}
          </ModalTitle>
          <ModalContent>
            {i18n.t(
              "You will not be able to undo this action. Click delete to confirm."
            )}
          </ModalContent>
          <ModalActions>
            <ButtonStrip>
              <Button
                onClick={() => {
                  setDeleteConfirmOpen(false);
                }}
              >
                {i18n.t("Cancel")}
              </Button>
              <Button
                destructive
                onClick={() => {
                  setDeleteConfirmOpen(false);
                  deleteFavorite();
                }}
              >
                {i18n.t("Delete")}
              </Button>
            </ButtonStrip>
          </ModalActions>
        </Modal>
      )}

      <div className="cardContainer">
        <Card>
          {deleteLoading && (
            <div className="flexContainer">
              <CircularLoader />
              <span className="deleteFeedbackSpan">
                {i18n.t("Delete in progress")}
              </span>
            </div>
          )}

          <Form onSubmit={onSave}>
            {({ handleSubmit, pristine }) => (
              <form onSubmit={handleSubmit}>
                <div className="flexContainer">
                  <div
                    className={
                      type === "dashboard"
                        ? "fieldsContainerEmpty"
                        : "fieldsContainer"
                    }
                  >
                    <div className="flexContainer">
                      <div className="inputField">
                        <Field
                          name="name"
                          label="Name"
                          component={InputFieldFF}
                          initialValue={visName}
                          validate={hasValue}
                        />
                      </div>
                    </div>

                    <div className="flexContainer">
                      <div className="inputField">
                        <Field
                          name="createdBy"
                          label="Owner"
                          component={InputFieldFF}
                          className="inputField"
                          initialValue={`${metadata.createdBy.name} (${metadata.createdBy.username})`}
                          disabled
                        />
                      </div>
                    </div>
                    {sharingInfo && (
                      <div className="flexContainer">
                        <div className="inputField">
                          <p>{`Shared with ${sharingInfo.object.userGroupAccesses.length} user groups and ${sharingInfo.object.userAccesses.length} users`}</p>
                          <Button
                            icon={<IconShare16 />}
                            onClick={() => {
                              setSharingDialogOpen(true);
                            }}
                          >
                            {i18n.t("Update sharing")}
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="footerNavigation">
                      <div className="footerButtons">
                        <ButtonStrip>
                          <Button
                            type="submit"
                            primary
                            disabled={pristine || deleteLoading || saveLoading}
                          >
                            {i18n.t("Save")}
                          </Button>
                          <Button
                            destructive
                            onClick={() => {
                              setDeleteConfirmOpen(true);
                            }}
                            disabled={deleteLoading || saveLoading}
                          >
                            {i18n.t("Delete")}
                          </Button>
                        </ButtonStrip>
                      </div>
                    </div>
                  </div>
                  {["map", "visualization"].includes(type) && (
                    <div className="visualizationPluginContainer">
                      <>
                        {type !== "map" && <VisualizationItemPlugin id={id} />}
                        {type === "map" && (
                          <MapPlugin
                            activeType="MAP"
                            applyFilters={getFilteredVisualization}
                            item={{ type: "MAP" }}
                            itemFilters={{}}
                            style={{ height: 480, width: 480 }}
                            visualization={metadata}
                          />
                        )}
                      </>
                    </div>
                  )}
                </div>
                <ContentTable metadata={metadata} type={type} />
              </form>
            )}
          </Form>
        </Card>
      </div>

      <style jsx>
        {`
          .cardContainer {
            padding: var(--spacers-dp16);
          }
          .flexContainer {
            display: flex;
          }
          .fieldsContainerEmpty {
            min-height: 100px;
            display: flex;
            flex-direction: column;
          }
          .fieldsContainer {
            min-height: 500px;
            display: flex;
            flex-direction: column;
          }
          .footerNavigation {
            margin: var(--spacers-dp24) var(--spacers-dp16) 0
              var(--spacers-dp16);
            display: flex;
            align-items: center;
          }
          .visualizationPluginContainer {
            width: 500px;
            margin: 40px 20px 20px auto;
            padding: 10px;
            border: 1px solid grey;
          }
          .deleteFeedbackSpan {
            font-size: 16px;
            display: block;
            height: 20px;
            margin: 8px;
          }
          .inputField {
            min-width: 500px;
            margin: var(--spacers-dp16) var(--spacers-dp16) 0
              var(--spacers-dp16);
          }
        `}
      </style>
    </>
  );
};

ItemDetails.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  metadata: PropTypes.object,
  setVisName: PropTypes.func,
  sharingData: PropTypes.object,
  visName: PropTypes.string,
};

const ViewContentInner = ({ id, type }) => {
  const engine = useDataEngine();
  const [visName, setVisName] = useState("");
  const { data, loading, error } = useDataQuery(
    type === "visualization"
      ? visualizationQuery
      : type === "map"
      ? mapQuery
      : dashboardQuery,
    {
      variables: { id, sqlViewCountID: appConfig.sqlViewCountID },
      onComplete: (data) => {
        setVisName(data.visualizationDetail.name);
      },
    }
  );

  return (
    <>
      {loading && (
        <div className="viewHeader">
          <CircularLoader />
        </div>
      )}
      {error && (
        <div className="viewHeader">
          <Button
            icon={<IconArrowLeft24 />}
            onClick={() => {
              window.location.href = "#";
            }}
          />
          <h2>{i18n.t("Visualization not accessible")}</h2>
        </div>
      )}
      {data && (
        <>
          <div className="viewHeader">
            <Button
              icon={<IconArrowLeft24 />}
              onClick={() => {
                window.location.href = "#";
              }}
            />
            <h2>{visName}</h2>
            <div>
              <Button
                icon={
                  type === "map" ? (
                    <IconLocation16 />
                  ) : type === "dashboard" ? (
                    <IconDashboardWindow16 />
                  ) : (
                    <IconVisualizationArea16 />
                  )
                }
                onClick={() => {
                  switch (type) {
                    case "map":
                      window.open(
                        `${engine.link.baseUrl}/dhis-web-maps/index.html?id=${id}`,
                        "_blank"
                      );
                      break;
                    case "dashboard":
                      window.open(
                        `${engine.link.baseUrl}/dhis-web-dashboard/#/${id}`,
                        "_blank"
                      );
                      break;
                    default:
                      window.open(
                        `${engine.link.baseUrl}/dhis-web-data-visualizer/index.html#/${id}`,
                        "_blank"
                      );
                  }
                }}
              >
                {i18n.t(
                  `Open ${
                    type === "map"
                      ? "in maps"
                      : type === "dashboard"
                      ? "as dashboard"
                      : "in visualizer"
                  }`
                )}
              </Button>
            </div>
            <div>
              <Button
                icon={<CodeIcon />}
                onClick={() => {
                  switch (type) {
                    case "map":
                      window.open(
                        `${engine.link.baseUrl}/api/maps/${id}`,
                        "_blank"
                      );
                      break;
                    case "dashboard":
                      window.open(
                        `${engine.link.baseUrl}/api/dashboards/${id}`,
                        "_blank"
                      );
                      break;
                    default:
                      window.open(
                        `${engine.link.baseUrl}/api/visualizations/${id}`,
                        "_blank"
                      );
                  }
                }}
              >
                {i18n.t("Open in api")}
              </Button>
            </div>
            <div>
              <Tag icon={<IconView16 />}>
                {i18n.t("viewed {{viewCount}} times", {
                  viewCount: data.visualizationViews.listGrid.rows[0][1] || 0,
                })}
              </Tag>
            </div>
            <div>
              <Tag icon={<IconCalendar16 />}>
                {i18n.t("last viewed: {{viewDate}}", {
                  viewDate: data.visualizationViews.listGrid.rows[0][2]
                    ? data.visualizationViews.listGrid.rows[0][2].substring(
                        0,
                        10
                      )
                    : i18n.t("never"),
                  keySeparator: ">",
                  nsSeparator: "|",
                })}
              </Tag>
            </div>
          </div>
          <ItemDetails
            id={id}
            type={type}
            metadata={data.visualizationDetail}
            sharingData={data?.sharing || null}
            setVisName={setVisName}
            visName={visName}
          />
        </>
      )}
      <style jsx>
        {`
          .viewHeader {
            margin: var(--spacers-dp16) var(--spacers-dp16) 0
              var(--spacers-dp16);
            display: flex;
            align-items: center;
          }
          .viewHeader * {
            padding-left: var(--spacers-dp16);
          }
        `}
      </style>
    </>
  );
};

ViewContentInner.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const determineType = (href) => {
  const types = ["visualization", "map", "dashboard"];
  for (let i = 0; i < types.length; i++) {
    if (href.includes(types[i])) {
      return types[i];
    }
  }
  return null;
};

const ViewContent = ({ id }) => {
  const { data, error } = useDataQuery(typeQuery, {
    variables: { id },
  });

  return (
    <>
      {(data || error) && (
        <>
          <ViewContentInner
            type={determineType(data ? data?.type?.href : "dashboard")}
            id={id}
          />
        </>
      )}
    </>
  );
};

ViewContent.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ViewContent;

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
  IconShare16,
  InputFieldFF,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
  IconArrowLeft24,
  IconCalendar16,
  IconView16,
  IconVisualizationArea16,
  Tag,
  hasValue,
  ReactFinalForm,
} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { appConfig } from "./app.config.js";
import ContentTable from "./ContentTable";
import VisualizationItemPlugin from "./VisualizationItemPlugin";

const visualizationQuery = {
  visualizationDetail: {
    resource: "visualizations",
    id: ({ id }) => id,
    params: {
      fields: [
        "id",
        "name",
        "createdBy[name,username]",
        "categoryOptionGroupSetDimensions[categoryOptionGroupSet[id,name],categoryOptionGroups[id,name]]",
        "categoryDimensions[category[id,name],categoryOptions[id,name]]",
        "dataElementGroupSetDimensions[dataElementGroupSet[id,name],dataElementGroups[id,name]]",
        "dataDimensionItems[dataDimensionItemType,dataElement[id,name],indicator[id,name],dataElementOperand[id,name],reportingRate[dataSet[id,name],id,name,metric],programDataElement[dataElement[id],name]]",
        "itemOrganisationUnitGroups[id,name]",
        "relativePeriods",
        "periods[id,name]",
        "organisationUnits[id,name]",
        "organisationUnitLevels",
        "userOrganisationUnit",
        "userOrganisationUnitChildren",
        "userOrganisationUnitGrandchildren",
        "organisationUnitGroupSetDimensions[organisationUnitGroupSet[id,name],organisationUnitGroups[id,name]]",
        "programIndicatorDimensions[id,name,program[id,name]]",
        "dataElementGroupSetDimensions[dataElementGroupSet[id,name],dataElementGroups[id,name]]",
      ],
    },
  },
  visualizationViews: {
    resource: "sqlViews",
    id: ({ sqlViewCountID }) => `${sqlViewCountID}/data`,
    params: ({ id }) => ({
      var: `uid:${id}`,
      paging: false,
    }),
  },
  sharing: {
    resource: "sharing",
    params: ({ id }) => ({
      type: "visualization",
      id: id,
    }),
  },
};

const deleteMutation = {
  resource: "visualizations",
  id: ({ id }) => id,
  type: "delete",
};

const saveMutation = {
  resource: "visualizations",
  id: ({ id }) => id,
  type: "update",
  partial: true,
  data: ({ data }) => data,
};

const ItemDetails = ({ id, metadata, sharingInfo, setVisName, visName }) => {
  const { Field, Form } = ReactFinalForm;
  const { d2 } = useD2();
  const [sharingDialogOpen, setSharingDialogOpen] = useState(false);
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
    deleteMutation,
    {
      variables: { id },
      onComplete: onSuccessfulDelete,
      onError: onErrorDelete,
    }
  );

  const [saveFavorite, { loading: saveLoading }] = useDataMutation(
    saveMutation,
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
          type="visualization"
          open={sharingDialogOpen}
          onRequestClose={() => {
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
                  <div className="fieldsContainer">
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
                  <div className="visualizationPluginContainer">
                    <VisualizationItemPlugin id={id} />
                  </div>
                </div>
                <ContentTable metadata={metadata} />
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
  metadata: PropTypes.object,
  setVisName: PropTypes.func,
  sharingInfo: PropTypes.object,
  visName: PropTypes.string,
};

const ViewContent = ({ id }) => {
  const engine = useDataEngine();
  const [visName, setVisName] = useState("");
  const { data, loading, error } = useDataQuery(visualizationQuery, {
    variables: { id, sqlViewCountID: appConfig.sqlViewCountID },
    onComplete: (data) => {
      setVisName(data.visualizationDetail.name);
    },
  });

  return (
    <>
      {loading && <CircularLoader />}
      {error && (
        <div className="viewHeader">
          <Button
            icon={<IconArrowLeft24 />}
            onClick={() => {
              window.location.href = "/";
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
                window.location.href = "/";
              }}
            />
            <h2>{visName}</h2>
            <div>
              <Button
                icon={<IconVisualizationArea16 />}
                onClick={() => {
                  window.open(
                    `${engine.link.baseUrl}/dhis-web-data-visualizer/index.html#/${id}`,
                    "_blank"
                  );
                }}
              >
                {i18n.t("Open in visualizer")}
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
            metadata={data.visualizationDetail}
            sharingInfo={data.sharing}
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

ViewContent.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ViewContent;

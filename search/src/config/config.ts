const sqlViewQuery = `select uid, name, count as view_count, date, type, userid as user, 'default' as sql from (
    select * from (
          select uid, name, userid, 'dashboard' as type from dashboard where uid like '%\${uid}%'
          union
          select uid, name, userid, 'map' from map where uid like '%\${uid}%'
          union
          select uid, name, userid, case when type = 'PIVOT_TABLE' then 'pivot' else 'chart' end
            from visualization where uid like '%\${uid}%') v
      left join (
          select favoriteuid, count(*) as count, max(timestamp) as timestamp,
                 to_char(max(timestamp), 'YYYY-MM-DD') as date
            from datastatisticsevent
            where timestamp > '\${limitViewsMinDate}'
              and timestamp < '\${limitViewsMaxDate}'
            group by favoriteuid) dse
        on dse.favoriteuid = v.uid
      where v.type like '%\${visualizationType}%'
        and v.name ilike '%\${favoriteName}%'
        and v.userid::text ilike '%\${user}%'
        and ((dse.timestamp > '\${lastViewedMinDate}' and
              dse.timestamp < '\${lastViewedMaxDate}') or
             (1 = \${includeNeverViewed} and dse.timestamp is null))) x
  where count > \${minViewCount}
    and count < \${maxViewCount}
  order by name
  limit \${limit};`

export const config = {
    sqlViewName: 'VisNavgSrch',
    createSqlViewQuery:{
        id: "VisNavgSrch",
        type: "QUERY",
        sqlQuery: sqlViewQuery,
        name: "Visualization Navigator App Search",
        cacheStrategy: "NO_CACHE",
        "publicAccess": "--------",
    }
}
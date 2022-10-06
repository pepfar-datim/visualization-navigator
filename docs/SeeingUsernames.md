# Seeing Usernames

By default, the Visualization Navigator cannot show the usernames of the owners of DHIS2 visualizations. If you have administrative access to your postgres dabase, you can change that by following these steps.

**Step 1.** If you are using DHIS 2.38 or later, run this command in `psql`:
```
create view uzers as (select userinfoid as userid, username from userinfo);
```

If you are using DHIS 2.37 or earlier, run this command instead:
```
create view uzers as (select userid, username from users);
```

**Step 2.** Go into the DHIS2 Maintenance app and find the `VisNavgSrch` SQL view.  Change the SQL code of that SQL view to this:
```
select uid, name, count as view_count, date, type, username from (
    select * from (
          select uid, name, userid, 'dashboard' as type
            from dashboard where uid like '%${uid}%'
          union
          select uid, name, userid, 'map' from map where uid like '%${uid}%'
          union
          select uid, name, userid,
              case when type = 'PIVOT_TABLE' then 'pivot' else 'chart' end
            from visualization where uid like '%${uid}%') v
      left join (select userid, username from uzers) u using (userid)
      left join (
          select favoriteuid, count(*) as count, max(timestamp) as timestamp,
                 to_char(max(timestamp), 'YYYY-MM-DD') as date
            from datastatisticsevent
            where timestamp > '${limitViewsMinDate}'
              and timestamp < '${limitViewsMaxDate}'
            group by favoriteuid) dse
        on dse.favoriteuid = v.uid
      where v.type like '%${visualizationType}%'
        and v.name ilike '%${favoriteName}%'
        and u.username ilike '%${user}%'
        and ((dse.timestamp > '${lastViewedMinDate}' and
              dse.timestamp < '${lastViewedMaxDate}') or
             (1 = ${includeNeverViewed} and dse.timestamp is null))) x
  where ((count > ${minViewCount} and count < ${maxViewCount}) or
         (1 = ${includeNeverViewed} and count is null))
  order by name
  limit ${limit};
```

**Step 3.** You may need to clear your browser cache.

**Step 4.** Voila!  Now the app shows you the visualization's owners.

[Back to the README](https://github.com/pepfar-datim/visualization-navigator/blob/main/README.md)

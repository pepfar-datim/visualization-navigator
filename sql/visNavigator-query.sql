with viewcount as (
	select favoriteuid as uid, count(*) as count
		from (select * from datastatisticsevent where timestamp > '${dseLower}' and timestamp < '${dseUpper}') dse
		group by favoriteuid

),

lastviewdate as (
	select favoriteuid as uid, max(timestamp) as date
		from datastatisticsevent
		group by favoriteuid
),
consolidated as (

select d.uid,d.name,d.count as view_count, to_char(vd.date,'YYYY-MM-DD') as date,
 	'dashboard' as type
	from (select ch.*, case when viewc.count is null then 0 else viewc.count end as count from dashboard ch left join viewcount viewc on ch.uid=viewc.uid) d
	
        left join lastviewdate vd on d.uid=vd.uid
	where 
	d.name ilike '%${favName}%'

	and d.count > ${minCount}
	and d.count < ${maxCount}
	and (vd.date > '${minDate}' and vd.date < '${maxDate}' or (1=${retrieveNevers} and vd.date is null))

UNION

select m.uid,m.name,m.count as view_count, to_char(vd.date,'YYYY-MM-DD') as date,
 	'map' as type
	from (select ch.*, case when viewc.count is null then 0 else viewc.count end as count from map ch left join viewcount viewc on ch.uid=viewc.uid) m
	
        left join lastviewdate vd on m.uid=vd.uid
	where 
	m.name ilike '%${favName}%'

	and m.count > ${minCount}
	and m.count < ${maxCount}
	and (vd.date > '${minDate}' and vd.date < '${maxDate}' or (1=${retrieveNevers} and vd.date is null))

UNION

select c.uid,c.name,c.count as view_count, to_char(vd.date,'YYYY-MM-DD') as date,
 	case when c.type = 'PIVOT_TABLE' then 'pivot' else 'chart' end as type
	from (select ch.*, case when viewc.count is null then 0 else viewc.count end as count from visualization ch left join viewcount viewc on ch.uid=viewc.uid) c
	
        left join lastviewdate vd on c.uid=vd.uid
	where 
	c.name ilike '%${favName}%'

	and c.count > ${minCount}
	and c.count < ${maxCount}
	and (vd.date > '${minDate}' and vd.date < '${maxDate}' or (1=${retrieveNevers} and vd.date is null))
)

select * from consolidated where type like '%${visTypes}%' order by name
limit ${limitCount};

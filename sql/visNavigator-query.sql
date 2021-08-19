with viewcount as (
	select favoriteuid as uid, count(*) as count
		from datastatisticsevent
		group by favoriteuid

),

lastviewdate as (
	select favoriteuid as uid, max(timestamp) as date
		from datastatisticsevent
		group by favoriteuid
)

select c.uid,c.name,c.count,vd.date,
 	'chart' as type
	from (select ch.*, case when viewc.count is null then 0 else viewc.count end as count from chart ch left join viewcount viewc on ch.uid=viewc.uid) c
	
        left join lastviewdate vd on c.uid=vd.uid
	where 
	c.name ilike '%${favName}%'

	and c.count > ${minCount}
	and c.count < ${maxCount}
	and (vd.date > '${minDate}' and vd.date < '${maxDate}' or vd.date is null)
	
	order by c.name
	;
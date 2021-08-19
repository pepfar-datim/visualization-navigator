with viewcount as (
	select favoriteuid as uid, count(*) as count
		from datastatisticsevent
		where favoriteuid='${uid}'
		group by favoriteuid

),

lastviewdate as (
	select favoriteuid as uid, max(timestamp) as view_date
		from datastatisticsevent
		where favoriteuid='${uid}'
		group by favoriteuid
)

select c.uid, vc.count, lv.view_date
from (select uid from chart where uid='${uid}') c
left join viewcount vc on c.uid=vc.uid
left join lastviewdate lv on c.uid=lv.uid
;

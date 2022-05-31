export function removeUserColumn(data){
    if (data.rows.length===0) return data;
    let finalColumns;
    if (data.rows[0][6]==='enhanced') finalColumns = 6;
    else finalColumns = 5;
    data.headers = data.headers.slice(0,finalColumns)
    data.rows = data.rows.map((row)=>row.slice(0,finalColumns))
    return data;
}
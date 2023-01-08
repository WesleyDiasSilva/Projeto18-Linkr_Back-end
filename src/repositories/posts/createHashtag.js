import { db } from "../../database/connection.js";

function multipleQuery(query, multiple, final){
    let queryString = "";
    for(let el=0;  el <= query.length-1;  el++){
        if(el===query.length-1){
            queryString += final.replace("#", query[el]);
        }else if(query.length===0){
            queryString += "id=-1";
        }else{
            queryString += multiple.replace("#", query[el]);
        }
    }
    return queryString;
}

export async function createHashtag(post_id, tag_name) {
    try {
        let querySelectTrending = "SELECT * FROM trendings WHERE " + multipleQuery(tag_name, "name='#' or ", "name='#';");
        let queryTrendingValues = "INSERT INTO trendings (name) VALUES " + multipleQuery(tag_name, `('#'), `, `('#') RETURNING id;`);

        const query = await db.query(querySelectTrending);
        

            if(query.rows[0]){
                const nameList = query.rows.map(el => el.id);
                let multiplePostTrendings = "INSERT INTO posts_trendings (post_id, trending_id) VALUES " + multipleQuery(nameList, `($1, #), `, `($1, #);`);
                await db.query(
                    multiplePostTrendings, 
                    [post_id]
                );
            }else{
                await db.query(queryTrendingValues);
                const importTrendRecent = await db.query(querySelectTrending);
                const nameList = importTrendRecent.rows.map(el => el.id);
                let multiplePostTrendings = "INSERT INTO posts_trendings (post_id, trending_id) VALUES " + multipleQuery(nameList, `($1, #), `, `($1, #);`);

                await db.query(
                    multiplePostTrendings, 
                    [post_id]
                );
            }

            return { status: true, query: null };
    } catch {
        return { status: false, query: null };
    }
}
  
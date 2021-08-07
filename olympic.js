let request = require("request");
let cheerio = require("cheerio");
let url = "https://olympics.com/tokyo-2020/olympic-games/en/results/all-sports/medal-standings.htm"

request(url,cb);

function cb(error,response,html){
    if(error){
        console.log(error);
    }else if(response.statusCode == 404){
        console.log("PAGE NOT FOUND");
    }else{
        dataExtracter(html);
    }
} 

function dataExtracter(html){
    //search tool
    let searchTool = cheerio.load(html);
    // css selector
    let medalData = searchTool("#medal-standing.table-responsive tbody tr");
    console.log("Rank\tName\t\t\t\tGold\tSilver\tBronze\tTotal");
    let allData ="";
    for(let i =0;i<=medalData.length;i++){
        let countryData = searchTool(medalData[i]).find("td");
        let name = searchTool(countryData[1]).text().trim();
        let rank = searchTool(countryData[0]).text().trim();
        if(name=="India" || rank<=10){
            for(let i = 0;i<countryData.length-2;i++){
                let data = searchTool(countryData[i]).text().trim();
                process.stdout.write(data);
                if(data.length>20){
                    process.stdout.write("\t");
                }else if(data.length>8){
                    process.stdout.write("\t\t\t");
                }else if(data.length>3){
                    process.stdout.write("\t\t\t\t");
                }else if(data.length>2 && name.length>2){
                    process.stdout.write("\t\t\t\t");
                }else{
                    process.stdout.write("\t");
                }
            }
            console.log();
        }
    }

}
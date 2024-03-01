const authToken = "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";
const username = "aryangupta1105"
const url = `https://api.github.com/users/${username}`;

async function CallData(){
    
    const response = await fetch(url , { 
        headers: {
        'Authorization' : `Bearer ${authToken}`,
    }});
    const data = await response.json();
    console.log(response.status);
    console.log(data);
}

CallData();
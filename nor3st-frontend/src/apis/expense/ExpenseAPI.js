
export function getExpenses() {

    return new Promise((resolve, reject) => {
        // const url = "http://localhost:8080/expense";

        const result = fetch("http://localhost:8080/expense", {
            method: "GET",
        }).then(res => res.json())
        .catch(error => console.log(error));

        
        
        resolve(result);
    });


}

export function GetMonthlyExpenses() {
    return new Promise((resolve, reject) => {
        const result = fetch("http://localhost:8080/expense/monthly", {
            method: "GET",
        }).then(res => res.json())
        .catch(error => console.log(error));

        resolve(result);
    });
}

export function GetProfit() {
    return new Promise((resolve, reject) => {
        const result = fetch("http://localhost:8080/profit", {
            method: "GET",
        }).then(res => res.json())
        .catch(error => console.log(error));

        resolve(result);
    });
}
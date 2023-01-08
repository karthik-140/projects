const form=document.getElementById('my-form');
form.addEventListener('submit', onsubmit);
function onsubmit(e){
    e.preventDefault();
    const amount=e.target.money.value;
    const description=e.target.description.value;
    const category=e.target.category.value;
   const obj={
    amount,description,category
   }
   localStorage.setItem(obj.description,JSON.stringify(obj));
   showOnScreen(obj);
}
window.addEventListener('DOMContentLoaded', () =>{
    const localStorageObj=localStorage;
    const localStoragekeys=Object.keys(localStorageObj);
    for(var i=0;i<localStoragekeys.length;i++){
        const key=localStoragekeys[i];
        const ExpensesString=localStorageObj[key];
        const ExpensesObj=JSON.parse(ExpensesString);
        showOnScreen(ExpensesObj);
    }
})
function showOnScreen(expenses){
    document.getElementById('money').value='';
    document.getElementById('description').value='';
    document.getElementById('category').value='';
    const parentNode=document.getElementById('list');
    const childNode=`<li id=${expenses.description} style="margin-bottom:10px;">${expenses.amount} - ${expenses.description} - ${expenses.category}
                    <button onclick=deleteExpenses('${expenses.description}') style="float:right;">Delete</button>
                    <button onclick=editExpenses('${expenses.amount}','${expenses.description}','${expenses.category}') style="float:right; margin-right:5px;">Edit</button>
                    </li>`
             parentNode.innerHTML=parentNode.innerHTML+childNode;
}
function editExpenses(amount,description,category){
    document.getElementById('money').value=amount;
    document.getElementById('description').value=description;
    document.getElementById('category').value=category;
    deleteExpenses(description);
}
function deleteExpenses(expenses){

      localStorage.removeItem(expenses);
      removeFromScreen(expenses);
}
function removeFromScreen(expenses){
    const parentNode=document.getElementById('list');
    const childNode=document.getElementById(expenses);
    parentNode.removeChild(childNode);
}

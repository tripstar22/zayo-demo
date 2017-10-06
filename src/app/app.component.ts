import { Component, OnInit, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'zayo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {

  // specify event
  e: Event;

  constructor() {}
  
  // append a row
  appendRow(e) {
    // get event target
    const trgt = e.target;
    // get trgt row in order to delete
    const trgtRow = trgt.parentNode.parentNode;
    // create table row el
    const elRow = document.createElement('tr');
    // create table data els
    const elData1 = document.createElement('td');
    const elData2 = document.createElement('td');
    const elData3 = document.createElement('td');
    const elData4 = document.createElement('td');
    // create span els for cells that have to do with money
    const elSpan1 = document.createElement('span');
    const elSpan2 = document.createElement('span');
    // create button el for cell that have options for row
    const elBtn = document.createElement('button');
    // check to see if new row goes in revenue or expenses
    // revenue
    if (trgtRow.classList.contains('revenue')) {
      // get last row about revenue
      const rowLast = document.getElementById('lastRevenue');
      // get parent node of last revenue row
      const parentRow = rowLast.parentNode;
      // insert new row above last revenue row
      parentRow.insertBefore(elRow, rowLast);
      // append new els to new row
      rowLast.previousSibling.appendChild(elData1);
      rowLast.previousSibling.appendChild(elData2);
      rowLast.previousSibling.appendChild(elData3);
      rowLast.previousSibling.appendChild(elData4);
      // append spans to els that have to do with money
      elData2.appendChild(elSpan1);
      elData3.appendChild(elSpan2);
      // add classes to spans
      elSpan1.classList.add('revOneTime');
      elSpan2.classList.add('revMonthly');
      // add events on blur to monetary values
      elSpan1.addEventListener('blur', (e) => this.rev(e));
      elSpan2.addEventListener('blur', (e) => this.rev(e));
    // expenses
    } else {
      // get last row about expenses
      const rowLast = document.getElementById('lastExpenses');
      // get parent node of last expenses row
      const parentRow = rowLast.parentNode;
      // insert new row above last expenses row
      parentRow.insertBefore(elRow, rowLast);
      // append new els to new row
      rowLast.previousSibling.appendChild(elData1);
      rowLast.previousSibling.appendChild(elData2);
      rowLast.previousSibling.appendChild(elData3);
      rowLast.previousSibling.appendChild(elData4);
      // append spans to els that have to do with money
      elData2.appendChild(elSpan1);
      elData3.appendChild(elSpan2);
      // add classes to spans
      elSpan1.classList.add('expOneTime');
      elSpan2.classList.add('expMonthly');
      // add events on blur to monetary values
      elSpan1.addEventListener('blur', (e) => this.exp(e));
      elSpan2.addEventListener('blur', (e) => this.exp(e));
    }
    // make first new td el editable
    elData1.contentEditable = 'true';
    // append button to el that gives options for row
    elData4.appendChild(elBtn);
    // add classes to btn
    elBtn.classList.add('btn');
    elBtn.classList.add('btn-primary');
    // make spans editable
    elSpan1.contentEditable = 'true';
    elSpan2.contentEditable = 'true';
    // add content to new td and span els
    elData1.innerHTML = 'New';
    elSpan1.innerHTML = '0';
    elSpan2.innerHTML = '0';
    elSpan1.insertAdjacentText('beforebegin', '$');
    elSpan2.insertAdjacentText('beforebegin', '$');
    elBtn.innerHTML = 'Delete';
    // add delete function to dynamically created button
    elBtn.addEventListener('click', (e) => this.deleteRow(e));
    // add event listeners to monetary values
    elSpan1.addEventListener('blur', (e) => this.financialReport(e));
    elSpan1.addEventListener('blur', (e) => setTimeout(this.valMonetary(e), 200));
    elSpan2.addEventListener('blur', (e) => this.financialReport(e));
    elSpan2.addEventListener('blur', (e) => setTimeout(this.valMonetary(e), 200));
  }

  // delete row function
  deleteRow(e):any {
    // get event target
    const trgt = e.target;
    // delete row
    const elRow = trgt.parentNode.parentNode;
    trgt.parentNode.parentNode.parentNode.removeChild(elRow);
  }

  // add one time revenue
  // add monthly revenue
  // add total revenue
  rev(e):any {
    // get all els with one time revenue
    const elsOT = document.querySelectorAll('.revOneTime');
    // create var for sum
    let sumOT = 0; 
    // get el for one time revenue total
    const totalOT = document.getElementById('totalRevOneTime'); 
    // loop through array of els
    for (let i=0; i < elsOT.length; i++) {
      // get value of revenue string
      let str = elsOT[i].innerHTML;
      // turn string into number
      let num = parseFloat(str);
      // add numbers to sum
      sumOT += num;
    }
    // make sure formatted with two decimal places
    let strNewOT = sumOT.toFixed(2);
    totalOT.innerHTML = strNewOT;

    // get all els with monthly revenue
    const elsMon = document.querySelectorAll('.revMonthly');
    // create var for sum
    let sumMon = 0; 
    // get el for monthly revenue total
    const totalMon = document.getElementById('totalRevMonthly'); 
    // loop through array of els
    for (let i=0; i < elsMon.length; i++) {
      // get value of revenue string
      let str = elsMon[i].innerHTML;
      // turn string into number
      let num = parseFloat(str);
      // add numbers to sum
      sumMon += num;
    }
    // make sure formatted with two decimal places
    let strNewMon = sumMon.toFixed(2);
    totalMon.innerHTML = strNewMon;

    // create number for total revenue
    // get el for total revenue
    const elTotalRev = document.getElementById('totalRev');
    // get total revenue
    let totalRev = (sumMon * 12) + sumOT;
    // make sure formatted with two decimal places
    let strTotalRev = totalRev.toFixed(2);
    elTotalRev.innerHTML = strTotalRev;
  }

  // add one time expenditures
  // add monthly expenditures
  // total expenditures
  exp(e):any {
    // get all els with one time expenditures
    const elsOT = document.querySelectorAll('.expOneTime');
    // create var for sum
    let sumOT = 0; 
    // get el for one time expenditures total
    const totalOT = document.getElementById('totalExpensesOneTime'); 
    // loop through array of els
    for (let i=0; i < elsOT.length; i++) {
      // get value of expeditures string
      let str = elsOT[i].innerHTML;
      // turn string into number
      let num = parseFloat(str);
      // add numbers to sum
      sumOT += num;
    }
    // make sure formatted with two decimal places
    let strNewOT = sumOT.toFixed(2);
    totalOT.innerHTML = strNewOT;

    // get all els with monthly expenditures
    const elsMon = document.querySelectorAll('.expMonthly');
    // create var for sum
    let sumMon = 0; 
    // get el for monthly expenditures total
    const totalMon = document.getElementById('totalExpensesMonthly'); 
    // loop through array of els
    for (let i=0; i < elsMon.length; i++) {
      // get value of expeditures string
      let str = elsMon[i].innerHTML;
      // turn string into number
      let num = parseFloat(str);
      // add numbers to sum
      sumMon += num;
    }
    // make sure formatted with two decimal places
    let strNewMon = sumMon.toFixed(2);
    totalMon.innerHTML = strNewMon;

    // create number for total expenditures
    // get el for total expenditures
    const elTotalExp = document.getElementById('totalExpenses');
    // get total revenue
    let totalExp = (sumMon * 12) + sumOT;
    // make sure formatted with two decimal places
    let strTotalExp = totalExp.toFixed(2);
    elTotalExp.innerHTML = strTotalExp;
  }

  // monthly contribution profit
  // total contribution profit
  // contribution margin
  // captial roi (months)
  financialReport(e):any {
    // monthly contribution profit
    // get el for monthly revenue
    const elRevMon = document.getElementById('totalRevMonthly');
    // get el for monthly expenses
    const elExpMon = document.getElementById('totalExpensesMonthly');
    // get el for monthly contribution profit
    const elCM = document.getElementById('contributionProfitMonthly');
    // convert strings to numbers
    let revMon = parseFloat(elRevMon.innerHTML);
    let expMon = parseFloat(elExpMon.innerHTML);
    // get total for monthly contribution profit
    let totalCM = revMon - expMon;
    // make sure formatted with two decimal places
    let strTotalCM = totalCM.toFixed(2);
    elCM.innerHTML = strTotalCM;

    // total contribution profit
    // get el for total revenue
    const elTotalRev = document.getElementById('totalRev');
    // get el for total expenses
    const elTotalExp = document.getElementById('totalExpenses');
    // get el for total contribution profit
    const elCT = document.getElementById('contributionProfitTotal');
    // convert strings to numbers
    let revTotal = parseFloat(elTotalRev.innerHTML);
    let expTotal = parseFloat(elTotalExp.innerHTML);
    // get total contribution profit
    let totalCont = revTotal - expTotal;
    // make sure formatted with two decimal places
    let strTotalCont = totalCont.toFixed(2);
    elCT.innerHTML = strTotalCont;

    // contribution margin
    // get el for contribution margin
    const elContMargin = document.getElementById('contributionMarginTotal'); 
    let contMargin = (totalCont / revTotal) * 100;
    // make sure formatted with two decimal places
    let newVal = Math.round(contMargin);
    let strContMargin = newVal.toString();
    elContMargin.innerHTML = strContMargin;

    // captial roi (months)
    // get el for total expenses for month
    const elTotalExpOT = document.getElementById('totalExpensesOneTime');
    // get el for total revenue for month
    const elTotalRevOT = document.getElementById('totalRevOneTime');
    // get el for capital roi
    const elCapRoi = document.getElementById('capitalRoi');
    // convert strings to numbers
    let totalExpOT = parseFloat(elTotalExpOT.innerHTML);
    let totalRevOT = parseFloat(elTotalRevOT.innerHTML);
    // get capital roi
    let capRoi = (totalExpOT - totalRevOT) / totalCM;
    // make sure formated with two decimal places
    let strCapRoi = capRoi.toFixed(1);
    elCapRoi.innerHTML = strCapRoi;
  }

  // validate monetary inputs
  valMonetary(e):any {
    // get event target
    const trgt = e.target;
    // regex for numbers, commas, and decimals
    const regexp = /^[0-9]+([,.][0-9]+)?$/g;
    // create var to check results
    let results = regexp.test(trgt.innerHTML);
    // run test
    if (results === true) {
      // do nothing
    } else {
      // remove innerHTML and replace
      // with string 0
      trgt.innerHTML = '0';
    }
  }

  ngOnInit() {
  }

  // Respond after Angular checks the component's views and child views.
  // Called after the ngAfterViewInit and every subsequent ngAfterContentChecked().
  // A component-only hook.
  // https://angular.io/guide/lifecycle-hooks
  ngAfterViewChecked() {
    setTimeout(this.rev(this.e), 200);
    setTimeout(this.exp(this.e), 200);
    setTimeout(this.financialReport(this.e), 200);
    setTimeout(this.valMonetary(this.e), 200);
  }
}

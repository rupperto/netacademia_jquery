//"use strict";

// Callback függvény fade után.
function fadeDone() {
  console.log(this);
}

// Eseménykezelő beállítása.
$("p").click(function () {
   $(this).hide();
   //$(this).fadeIn(5000);
   //$(this).fadeTo(5000, 1, fadeDone);
   //$(this).slideDown(5000).sliedUp(2000);
   $(this).slideDown(3500).css("color", "blue");
});

// Esemény kiváltása. Fired / Fires
//$("p").click();


// Kattintás megelőzése: preventDefault
$("nav a.nav-link").click(function (ev) {
  ev.preventDefault();
  startPageChange(this, 1, false);
});

function startPageChange(elem, num, bool) {
  var link = $(elem);
  var prop = link.data("prop") || "opacity";
  var val = link.data("value") || "0";
  var speed = link.data("speed") || 1000;
  var settings = {};//objektum letrehozasa
  settings[prop] = val;

  $(document.body).animate(settings, speed, function () {
    document.location = link.attr("href");
  });
}


// Event oldal.
$(".events-search-row input").on("keyup", function (ev) {
  $.each($(".events-card-deck .card .card-title"), function (index, elem) {
    elem = $(elem);
    var search = ev.target.value.toLowerCase();
    var content = elem.html().toLowerCase();
    if (content.indexOf(search) == -1) {
      elem.parents(".card").hide();
    } else {
      elem.parents(".card").show();
    }
  });
});

// Regiszter oldal.
$(".cherry-custom-file").on("change", function (ev) {
  var name = ev.target.value.split("\\").pop();
  $(this)
    .find(".file-name")
    .html(name);
});

var alertBox = $(".alert.alert-primary");
function showInvalidMessage() {
  alertBox
    .removeClass("alert-primary")
    .addClass("alert-danger")
    .find(".alert-message")
    .text("Sikertelen belépés!");
}




$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
//jegyek tombje

var tickets = [
    {
        event : "Sziget fesztivál",
        time : "2020-05-15 18:00" ,
        seller: "Kiss Mártom",
        pcs :6,
        link: "licit/1"
   },
    {
        event : "Cím 2",
        time : "2019-10-15 18:00" ,
        seller: "Nagy Márti",
        pcs :6,
        link: "licit/5"
   },
    {
        event : "Macskák",
        time : "2020-05-15 18:00" ,
        seller: "Kiss Mártom",
        pcs :40,
        link: "licit/1"
   },
    {
        event : "Volt fesztivál",
        time : "2020-10-15 18:00" ,
        seller: "Rupperto",
        pcs :15,
        link: "licit/1"
   },
    {
        event : "Balaton fesztivál",
        time : "2020-07-15 18:00" ,
        seller: "Varga Ferenc",
        pcs :106,
        link: "licit/3"
   },
];

//jegyek tablajanak generalasa
var ticketTable = $("table.table.table-striped").eq(0);
function fillTicketsTable(currentTickets)
{
    currentTickets= currentTickets || tickets;
    var tbody = ticketTable.find("tbody");
    tbody.html("");
    $.each (currentTickets, function (index, ticket) {
        var row = $(".template .ticket-row").clone();
        row.find("td").eq(0).html(index+1);
        row.find("td").eq(1).html(ticket.event);
        row.find("td").eq(2).html(ticket.time);
        row.find("td").eq(3).html(ticket.seller);
        row.find("td").eq(4).html(ticket.pcs);
        row.find("td").eq(5).html(ticket.link);
        tbody.append(row);
    })

}
fillTicketsTable();

$(".tickets-search-row input").on("keyup", filterTickets); 
function filterTickets()
{
 //console.log($(this).val());
    var currentValue = $(this).val().toLowerCase();
    var filteredTickets = []; 
    if (currentValue == ""){
        filteredTickets = tickets;
    }
    else  {
        filteredTickets = tickets.filter(function(item){
            var done = false;
            for(var k in item){
                if (item[k].toString().toLowerCase().indexOf(currentValue) > -1){
                    done = true;
                }
            }
            return done;
        });

    }
    fillTicketsTable(filteredTickets);
}

//jegyek tablazat rendezese
ticketTable.find("thead th[data-key]").on("click", orderTicketTable);
function orderTicketTable(){
    /*
    ticketTable.find("thead th [data-key]")
    .removeClass("asc")
    .removeClass("desc");*/



    var th =$(this);
    $.each(ticketTable.find('thead th[data-key]'), function (index, elem) {
        var currentTh = $(elem);
        if (th.data("key")!=currentTh.data("key")){
            currentTh.removeClass('asc').removeClass('desc');
        }

    }
    
    )
    var key = th.data("key");
    var sortedTickets = tickets.map(function(item){
        return item;
        });

    if (th.hasClass("asc")) {
        th.removeClass("asc").addClass("desc");
    } else
    {
        th.removeClass("desc").addClass("asc");
    }  

    sortedTickets.sort(function(a, b){

        if (th.hasClass("asc")) {
            return a[key].toString().localeCompare(b[key].toString() ) ;
        } else
        {
            return b[key].toString().localeCompare(a[key].toString() ) ;
        }  
        
    });
    fillTicketsTable(sortedTickets);

    }



/*

// jQuery plugin for send form data.
$.fn.sendForm = function() {
  var form = $(this);
  var action = form.attr("action");
  var method = form.attr("method") || "post";
  var callBack = form.attr("callBack");

  function checkFormItem(input) {
    input = $(input);
    if (input.attr("required") && input.val() == "") {
      input.parents(".form-group").addClass("invalid");
      return false;
    } else {
      input.parents(".form-group").removeClass("invalid");
    }

    return true;
  }

  form.on("submit", function(ev) {
    ev.preventDefault();
    var formData = {};
    var formIsValid = [];
    $(this).find("input, select, textarea").each( function(index, input) {
      formData[input.name] = input.value;
      formIsValid.push(checkFormItem(input));
    });

    if (formIsValid.indexOf(false) > -1) {
      return;
    }

    $.ajax({
      type: method.toUpperCase(),
      url: action,
      data: formData,
      dataType: 'json'
    }).done( function(resp) {
      console.log(resp);
      if (window[callBack]) {
        window[callBack]();
      }
    });
  });

  return this;
};

$("#newEventForm").sendForm();
*/
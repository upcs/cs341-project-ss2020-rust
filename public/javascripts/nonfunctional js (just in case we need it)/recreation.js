/* recreation page javascript */
function search_rec() {
    let input = document.getElementById('searchbar_input_rec').value
    input = input.toLowerCase();
    /* make this functional when there is a table in event page
        go to table.css to enable functionality
        still need to add onkeyup when all are pushed to master
    let x = document.getElementsByClassName('artclass');
    */
    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        }
        else {
            x[i].style.display = "table-cell";
        }
    }


}
import { useState, useEffect } from "react";
import "./App.css";

function Table() {
  const [tableData, setTableData] = useState([]);
  //using useEffect for the fetch to receive data and
  useEffect(() => {
    fetch("https://fetch-hiring.s3.amazonaws.com/hiring.json")
      .then((response) => response.json())
      .then((data) => setTableData(data));
    console.log(tableData);
  }, []);

  //filtering the data to remove null and blank names
  function filterTable(data) {
    console.log(data);
    const filteredList = data.filter((item) => {
      return !(item.name === "") && !(item.name === null);
    });
    console.log("filteredList", filteredList);
    return filteredList;
  }

  //sorting the data to group by listId
  function sortTable(data) {
    //use sort function to compare the filtered data in the list. sort list from smallest listId to largest listId
    //
    data.sort((itemA, itemB) => {
      // if listId is less than other listId, return negative number

      if (itemA.listId !== itemB.listId) {
        return itemA.listId - itemB.listId;
      }
      //if listIds are equal, sort by name (smallest integer name to largest)
      //use localeCompare to sort string
      else {
        //pull second half of the string after "Item"
        const numberA = parseInt(itemA.name.split(" ")[1]);
        const numberB = parseInt(itemB.name.split(" ")[1]);
        return numberA - numberB;
      }
    });
    console.log("sortTable", data);
    return data;
  }

  console.log("tabledata at 0", tableData);
  //   tableData.forEach((item) => console.log("item in data", item));
  const filteredData = filterTable(tableData);
  const sortedData = sortTable(filteredData);
  return (
    <div className="table">
      <div className="table-header">
        <th id="listID-header">List ID: </th>
        <th id="name-header">Name: </th>
      </div>
      <div className="table-data">
        {sortedData.map((i) => {
          return (
            <div>
              <table>
                <td id="listID">{i.listId}</td>
                <td id="name">{i.name}</td>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Table;

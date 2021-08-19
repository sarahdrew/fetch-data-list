import { useState, useEffect } from "react";
import "./App.css";

function Table() {
  const [tableData, setTableData] = useState([]);
  //using useEffect for the fetch to retreive data and store in state as tableData
  useEffect(() => {
    fetch("https://fetch-hiring.s3.amazonaws.com/hiring.json")
      .then((response) => response.json())
      .then((data) => setTableData(data));
  }, []);

  //filtering the data to remove null and blank names
  function filterTable(data) {
    const filteredList = data.filter((item) => {
      return !(item.name === "") && !(item.name === null);
    });
    return filteredList;
  }

  //sorting the data to group by listId
  function sortTable(data) {
    //use sort function to compare the filtered data in the list. sort list from smallest listId to largest listId

    data.sort((itemA, itemB) => {
      // if listId is less than other listId, return negative number
      if (itemA.listId !== itemB.listId) {
        return itemA.listId - itemB.listId;
      }
      //if listIds are equal, sort by name (smallest integer name to largest)
      else {
        //pull second half of the string after "Item" using .split
        const numberA = parseInt(itemA.name.split(" ")[1]);
        const numberB = parseInt(itemB.name.split(" ")[1]);
        return numberA - numberB;
      }
    });
    return data;
  }
  //declare both filtered and sorted data to run functions above
  const filteredData = filterTable(tableData);
  const sortedData = sortTable(filteredData);

  //return a table with two columns. Map through sortedData to list data
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

const csvToJson = require("csvtojson")
const csvjson = require("csvjson")
const writeFile = require("fs").writeFile

var data = [{ field1: "id", field2: "id_data" }]

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value)
}

csvToJson({
  noheader: false,
  headers: ["field1", "field2", "field3"],
  ignoreEmpty: true,
  trim: true,
  delimiter: ";"
})
  .fromFile("data.csv")
  .then(jsonObj => {
    // Create new csv header with splited meta values
    jsonObj.forEach(row => {
      const meta = row.field3.split(",")
      meta.forEach(element => {
        const tempTotalColumns = Object.keys(data[0]).length
        if (!getKeyByValue(data[0], element)) {
          data[0]["field" + (tempTotalColumns + 1)] = element
        }
      })
    })

    // Get the total of columns from new created header
    const totalColumns = Object.keys(data[0]).length

    // Prepare each new row to add in the main data
    jsonObj.forEach((elm, idx) => {
      // Add the two static columns equals the old data
      const newRow = {
        field1: elm.field1,
        field2: elm.field2
      }

      // Fill all new meta columns with 0
      for (let i = 3; i <= totalColumns; i++) {
        newRow["field" + i] = 0
      }

      // Verify and fill matched values with new meta columns and set value to 1
      const meta = elm.field3.split(",")
      meta.forEach(element => {
        const field = getKeyByValue(data[0], element)
        if (field) {
          newRow[field] = 1
        }
      })

      // Add new row to main data
      data.push(newRow)
    })

    //console.log(data[0])
    //console.log(data[30])
    //console.log(data)

    // Convert the new json to CSV
    const csv = csvjson.toCSV(data, {
      delimiter: ";",
      headers: "none"
    })

    //console.log(csv)

    // Save CSV in disk
    writeFile("./output.csv", csv, err => {
      if (err) {
        console.log(err)
        throw new Error(err)
      }
      console.log("Success!")
    })
  })

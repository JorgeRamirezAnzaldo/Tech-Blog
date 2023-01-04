module.exports = { //Export funtion
    format_date: (date) => { //Method to format the date
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${ //Create date with format month/day/year and return it
          new Date(date).getFullYear()}`;
      },
};
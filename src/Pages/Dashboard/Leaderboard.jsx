const DataWindow = ({ dataList }) => {
  console.log(dataList);

  const styles = {
    main: {
      backgroundColor: "#292828",
      color: "#4286f5",
      padding: "20px",
      borderRadius: "8px",
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
    },
    heading: {
      marginBottom: "20px",
      fontSize: "48px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "10px",
      borderRadius: "8px",
    },
    th: {
      backgroundColor: "#346cc5",
      color: "white",

      padding: "1rem",
      fontSize: "48px", // Font size for headers
      border: "1px solid #fffff",
    },
    td: {
      backgroundColor: "white",
      color: "#292828",
      padding: "10px",
      fontSize: "32px",
      textAlign: "center", // Font size for data cells
      border: "1px solid #ddd",
    },
    firstTh: {
      width: "15%", // Width for the first column
    },
  };

  return (
    <div style={styles.main}>
      <h1 style={styles.heading}>LeaderBoard</h1>
      {dataList.length === 0 ? (
        <p>Waiting for players to join</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.th, ...styles.firstTh }}>Rank</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Points</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((item, index) => (
              <tr key={index}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{item.userName}</td>
                <td style={styles.td}>{item.points.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DataWindow;

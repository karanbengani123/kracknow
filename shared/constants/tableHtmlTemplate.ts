export const tableHtmlTemplate = `<!DOCTYPE html>
<html>
<head>
</head>
<body>
<table style="border-collapse: collapse;width: 100%">
  <tr>
    <%columns.forEach(column => {%>
    <th style="border: 1px solid #ddd;padding: 5px;text-align: left;"><%=column%></th>
    <%})%>
  </tr>
  <%rows.forEach(row => {%>
  <tr>
    <%row.forEach(rowColumn => {%>
    <td style="border: 1px solid #ddd;padding: 5px"><%=rowColumn%>></td>
    <%})%>
  </tr>
  <%})%>
</table>
</body>
</html>
`

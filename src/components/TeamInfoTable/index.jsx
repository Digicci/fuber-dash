

function TeamInfoTable({item}) {
  return (
        <tr>
          <td>{item.nom}</td>
          <td>{item.prenom}</td>
          <td>{item.adresse}</td>
          <td>{item.num}</td>
          <td>{item.mail}</td>
          <td>{item.cp}</td>
          <td>{item.ville}</td>
        </tr>
  );
}

export default TeamInfoTable;
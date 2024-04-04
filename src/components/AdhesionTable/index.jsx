function AdhesionTable({item}) {
  return (
    <tr>
      <td>{item.nom}</td>
      <td>{item.prenom}</td>
      <td>{item.nom_commercial}</td>
      <td>{item.siret}</td>
      <td>{item.tva}</td>
      <td>{item.adresse}</td>
      <td>{item.num}</td>
      <td>{item.mail}</td>
      <td>{item.cp}</td>
      <td>{item.ville}</td>
    </tr>
  );
}

export default AdhesionTable;
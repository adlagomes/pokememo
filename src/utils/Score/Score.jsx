export const Score = ({w, d}) => {

  return (
    <table className="score">
      <tbody>
        <tr>
          <td>Vitórias:</td>
          <td className="win">{w}</td>
        </tr>
        <tr>
          <td>Derrotas:</td>
          <td className="lose">{d}</td>
        </tr>
      </tbody>
    </table>
  );
};

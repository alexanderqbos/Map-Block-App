const MessageRow = ({ id, name, msgText, msgNum }) => {
    return (
      <tr>
        <td>{msgNum}</td>
        <td>{name}</td>
        <td>{msgText}</td>
      </tr>
    );
};
export default MessageRow;
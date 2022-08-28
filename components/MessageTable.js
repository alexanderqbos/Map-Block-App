import Table from 'react-bootstrap/Table'
import MessageRow from '../components/MessageRow'

const MessageTable = ({className, messages}) => {
    return (
      <Table className={className}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
        {
          messages.map((message, index) => {
            return (<MessageRow key={message.id} {...message} msgNum={index+1}/>);
          })
        }
        </tbody>
      </Table>
    );
  };

  export default MessageTable;
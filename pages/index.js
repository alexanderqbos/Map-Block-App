import Header from '../components/Header'
import Footer from '../components/Footer'
import MessageAppBody from '../components/MessageAppBody'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'

export async function getStaticProps() 
{
  let jsonData;

  try 
  {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/messages`);
    jsonData = data;
  } catch (error)
  {
    console.error('API Error:', error);
  }


  return {
    props: {
      jsonData
    }
  };
}

export default function Home( props  ) {
  const {jsonData} = props;
  return (
    <Container lg={12}>
        <Row className="justify-content-center">
          <Col>
            <Header className="mt-1 px-2 bg-secondary bg-gradient bg-opacity-75 rounded"/>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col>
            <MessageAppBody jsonData={jsonData} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Footer className="text-sm-end"/>
          </Col>
        </Row>
    </Container>
  )
}

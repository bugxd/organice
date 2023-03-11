import { graphql } from '../gql';
import { useGraphQL } from '../hooks/useGraphql';
import Workflow from '../components/workflow/Workflow';
import { Container } from 'semantic-ui-react';

const GetWorkflows = graphql(/* GraphQL */ `
  query GetWorkflows {
    workflows {
        ...WorkflowItem
    }
  }
`);

function Home() {
    const { data } = useGraphQL(GetWorkflows)

    return (
        <Container>
            <ul>{
                data && data.workflows?.map((e, i) =>
                    <Workflow workflow={e} key={`workflow-${i}`} />
                )
            }
            </ul>
        </Container>
    )
}

export default Home;
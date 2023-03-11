import { graphql } from '../gql';
import { useGraphQL } from '../hooks/useGraphql';
import Workflow from '../components/workflow/Workflow';
import { Container, Grid, Header } from 'semantic-ui-react';

const GetWorkflows = graphql(`
  query GetWorkflows {
    workflows {
        ...WorkflowItem
    }
  }
`);

function Home() {
    const { data } = useGraphQL(GetWorkflows)

    return (
        <>
            <Header as='h1' dividing>
                Workflows
            </Header>
            {
                data && data.workflows?.map((e, i) =>
                    <Workflow workflow={e} key={`workflow-${i}`} />
                )
            }
        </>
    )
}

export default Home;
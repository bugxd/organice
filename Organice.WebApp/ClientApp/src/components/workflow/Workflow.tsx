import { FragmentType, useFragment } from '../../gql/fragment-masking'
import { graphql } from '../../gql'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { Button, Grid, Icon, Label, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export const WorkflowFragment = graphql(/* GraphQL */ `
  fragment WorkflowItem on Workflow {
    id,
    title,
    description,
    tags
  }
`)

const Workflow = (props: {
    workflow: FragmentType<typeof WorkflowFragment>
}) => {
    const workflow = useFragment(WorkflowFragment, props.workflow)
    return (
        <Segment key={'' + workflow.id}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={5}>
                        <h2 style={{ margin: '0px' }}>{workflow.title}</h2>
                        {workflow.tags.map((tag, i) => (<Label key={`${tag}_${i}` }><Icon name='hashtag' />{tag}</Label>))}
                    </Grid.Column>
                    <Grid.Column floated='right' width={2}>
                        <Button.Group icon>
                            <Button size='tiny'><Icon name='play' /></Button>
                            <Button
                                as={Link}
                                to={'/edit/' + workflow.id}
                                size='tiny'
                            >
                                <Icon name='edit' />
                            </Button>
                            <Button size='tiny'><Icon name='trash' /></Button>
                        </Button.Group>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <ReactMarkdown>{workflow.description}</ReactMarkdown>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
}

export default Workflow

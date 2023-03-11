import { FragmentType, useFragment } from '../../gql/fragment-masking'
import { graphql } from '../../gql'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

export const WorkflowFragment = graphql(/* GraphQL */ `
  fragment WorkflowItem on Workflow {
    id,
    title,
    description
  }
`)

const Workflow = (props: {
    workflow: FragmentType<typeof WorkflowFragment>
}) => {
    const workflow = useFragment(WorkflowFragment, props.workflow)
    return (
        <div>
            <h3>{workflow.title}</h3>
            <ReactMarkdown>{workflow.description}</ReactMarkdown>
        </div>
    )
}

export default Workflow

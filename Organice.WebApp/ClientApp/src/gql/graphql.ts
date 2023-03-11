/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Edge = {
  __typename?: 'Edge';
  id: Scalars['String'];
  label: Scalars['String'];
  sourceId: Scalars['String'];
  targetId: Scalars['String'];
};

export type EdgeInput = {
  id: Scalars['String'];
  label: Scalars['String'];
  sourceId: Scalars['String'];
  targetId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  workflow: Workflow;
};


export type MutationWorkflowArgs = {
  workflow: WorkflowInput;
};

export type Node = {
  __typename?: 'Node';
  deletable: Scalars['Boolean'];
  description: Scalars['String'];
  id: Scalars['String'];
  label: Scalars['String'];
  nodeType: NodeType;
};

export type NodeInput = {
  deletable: Scalars['Boolean'];
  description: Scalars['String'];
  id: Scalars['String'];
  label: Scalars['String'];
  nodeType: NodeType;
};

export enum NodeType {
  Default = 'DEFAULT',
  Input = 'INPUT',
  Output = 'OUTPUT'
}

export type Query = {
  __typename?: 'Query';
  workfloByIds: Workflow;
  workflows: Array<Workflow>;
};


export type QueryWorkfloByIdsArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
};

export type Workflow = {
  __typename?: 'Workflow';
  description: Scalars['String'];
  edges: Array<Edge>;
  id: Scalars['String'];
  nodes: Array<Node>;
  ownerId: Scalars['String'];
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
  user: User;
};

export type WorkflowInput = {
  description: Scalars['String'];
  edges: Array<EdgeInput>;
  id: Scalars['String'];
  nodes: Array<NodeInput>;
  ownerId: Scalars['String'];
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
};

export type GetWorkflowsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWorkflowsQuery = { __typename?: 'Query', workflows: Array<(
    { __typename?: 'Workflow' }
    & { ' $fragmentRefs'?: { 'WorkflowItemFragment': WorkflowItemFragment } }
  )> };

export type WorkflowItemFragment = { __typename?: 'Workflow', id: string, title: string, description: string } & { ' $fragmentName'?: 'WorkflowItemFragment' };

export const WorkflowItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkflowItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workflow"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<WorkflowItemFragment, unknown>;
export const GetWorkflowsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWorkflows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workflows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkflowItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkflowItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workflow"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<GetWorkflowsQuery, GetWorkflowsQueryVariables>;
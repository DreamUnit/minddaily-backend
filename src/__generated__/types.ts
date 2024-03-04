import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { IUser } from '../models/User';
import { IDiary } from '../models/Diary';
import { IDiaryNote } from '../models/DiaryNotes';
import { DataSourceContext } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Diary = {
  __typename?: 'Diary';
  createdAt: Scalars['DateTime']['output'];
  deletedDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  notes: Array<DiaryNote>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId: Scalars['ID']['output'];
  version: Scalars['Int']['output'];
};

export type DiaryFilterOpts = {
  field: Scalars['String']['input'];
  intValue?: InputMaybe<Scalars['Int']['input']>;
  stringValue?: InputMaybe<Scalars['String']['input']>;
};

export type DiaryNote = {
  __typename?: 'DiaryNote';
  createdAt: Scalars['DateTime']['output'];
  deletedDate?: Maybe<Scalars['DateTime']['output']>;
  diaryId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  images: Array<Maybe<Image>>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  version: Scalars['Int']['output'];
};

export type DiaryNoteFilterOpts = {
  field: Scalars['String']['input'];
  intValue?: InputMaybe<Scalars['Int']['input']>;
  stringValue?: InputMaybe<Scalars['String']['input']>;
};

export type FetchDiariesResponse = {
  __typename?: 'FetchDiariesResponse';
  code: Scalars['Int']['output'];
  count?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<Diary>>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FetchDiaryNoteResponse = {
  __typename?: 'FetchDiaryNoteResponse';
  code: Scalars['Int']['output'];
  data?: Maybe<DiaryNote>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FetchDiaryNotesResponse = {
  __typename?: 'FetchDiaryNotesResponse';
  code: Scalars['Int']['output'];
  count?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<DiaryNote>>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FetchDiaryResponse = {
  __typename?: 'FetchDiaryResponse';
  code: Scalars['Int']['output'];
  data?: Maybe<Diary>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FetchUserResponse = {
  __typename?: 'FetchUserResponse';
  code: Scalars['Int']['output'];
  data?: Maybe<User>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FetchUsersResponse = {
  __typename?: 'FetchUsersResponse';
  code: Scalars['Int']['output'];
  count?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<User>>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Image = {
  __typename?: 'Image';
  title?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser: User;
  createDiary?: Maybe<Diary>;
  createDiaryNote?: Maybe<Diary>;
};


export type MutationAddUserArgs = {
  email: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationCreateDiaryArgs = {
  title: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationCreateDiaryNoteArgs = {
  title: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  fetchDiaries?: Maybe<FetchDiariesResponse>;
  fetchDiaryByField?: Maybe<FetchDiariesResponse>;
  fetchDiaryById?: Maybe<FetchDiaryResponse>;
  fetchDiaryNoteById?: Maybe<FetchDiaryNoteResponse>;
  fetchDiaryNotes?: Maybe<FetchDiaryNotesResponse>;
  fetchDiaryNotesByField?: Maybe<FetchDiaryNotesResponse>;
  fetchUserById?: Maybe<FetchUserResponse>;
  fetchUsers?: Maybe<FetchUsersResponse>;
  fetchUsersByField?: Maybe<FetchUsersResponse>;
  users: Array<User>;
};


export type QueryFetchDiariesArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};


export type QueryFetchDiaryByFieldArgs = {
  filter: DiaryFilterOpts;
};


export type QueryFetchDiaryByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFetchDiaryNoteByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFetchDiaryNotesArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};


export type QueryFetchDiaryNotesByFieldArgs = {
  filter: DiaryNoteFilterOpts;
};


export type QueryFetchUserByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFetchUsersArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};


export type QueryFetchUsersByFieldArgs = {
  filter: UserFilterOpts;
};

export type User = {
  __typename?: 'User';
  authUserId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedDate?: Maybe<Scalars['DateTime']['output']>;
  diaries?: Maybe<Array<Maybe<Diary>>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
  version: Scalars['Int']['output'];
};

export type UserFilterOpts = {
  field: Scalars['String']['input'];
  intValue?: InputMaybe<Scalars['Int']['input']>;
  stringValue?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Diary: ResolverTypeWrapper<IDiary>;
  DiaryFilterOpts: DiaryFilterOpts;
  DiaryNote: ResolverTypeWrapper<IDiaryNote>;
  DiaryNoteFilterOpts: DiaryNoteFilterOpts;
  FetchDiariesResponse: ResolverTypeWrapper<Omit<FetchDiariesResponse, 'data'> & { data?: Maybe<Array<Maybe<ResolversTypes['Diary']>>> }>;
  FetchDiaryNoteResponse: ResolverTypeWrapper<Omit<FetchDiaryNoteResponse, 'data'> & { data?: Maybe<ResolversTypes['DiaryNote']> }>;
  FetchDiaryNotesResponse: ResolverTypeWrapper<Omit<FetchDiaryNotesResponse, 'data'> & { data?: Maybe<Array<Maybe<ResolversTypes['DiaryNote']>>> }>;
  FetchDiaryResponse: ResolverTypeWrapper<Omit<FetchDiaryResponse, 'data'> & { data?: Maybe<ResolversTypes['Diary']> }>;
  FetchUserResponse: ResolverTypeWrapper<Omit<FetchUserResponse, 'data'> & { data?: Maybe<ResolversTypes['User']> }>;
  FetchUsersResponse: ResolverTypeWrapper<Omit<FetchUsersResponse, 'data'> & { data?: Maybe<Array<Maybe<ResolversTypes['User']>>> }>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Image: ResolverTypeWrapper<Image>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<IUser>;
  UserFilterOpts: UserFilterOpts;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  DateTime: Scalars['DateTime']['output'];
  Diary: IDiary;
  DiaryFilterOpts: DiaryFilterOpts;
  DiaryNote: IDiaryNote;
  DiaryNoteFilterOpts: DiaryNoteFilterOpts;
  FetchDiariesResponse: Omit<FetchDiariesResponse, 'data'> & { data?: Maybe<Array<Maybe<ResolversParentTypes['Diary']>>> };
  FetchDiaryNoteResponse: Omit<FetchDiaryNoteResponse, 'data'> & { data?: Maybe<ResolversParentTypes['DiaryNote']> };
  FetchDiaryNotesResponse: Omit<FetchDiaryNotesResponse, 'data'> & { data?: Maybe<Array<Maybe<ResolversParentTypes['DiaryNote']>>> };
  FetchDiaryResponse: Omit<FetchDiaryResponse, 'data'> & { data?: Maybe<ResolversParentTypes['Diary']> };
  FetchUserResponse: Omit<FetchUserResponse, 'data'> & { data?: Maybe<ResolversParentTypes['User']> };
  FetchUsersResponse: Omit<FetchUsersResponse, 'data'> & { data?: Maybe<Array<Maybe<ResolversParentTypes['User']>>> };
  ID: Scalars['ID']['output'];
  Image: Image;
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  User: IUser;
  UserFilterOpts: UserFilterOpts;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DiaryResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Diary'] = ResolversParentTypes['Diary']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletedDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  notes?: Resolver<Array<ResolversTypes['DiaryNote']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiaryNoteResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['DiaryNote'] = ResolversParentTypes['DiaryNote']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletedDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  diaryId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<Maybe<ResolversTypes['Image']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FetchDiariesResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['FetchDiariesResponse'] = ResolversParentTypes['FetchDiariesResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['Diary']>>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FetchDiaryNoteResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['FetchDiaryNoteResponse'] = ResolversParentTypes['FetchDiaryNoteResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['DiaryNote']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FetchDiaryNotesResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['FetchDiaryNotesResponse'] = ResolversParentTypes['FetchDiaryNotesResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['DiaryNote']>>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FetchDiaryResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['FetchDiaryResponse'] = ResolversParentTypes['FetchDiaryResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['Diary']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FetchUserResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['FetchUserResponse'] = ResolversParentTypes['FetchUserResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FetchUsersResponseResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['FetchUsersResponse'] = ResolversParentTypes['FetchUsersResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = {
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationAddUserArgs, 'email' | 'username'>>;
  createDiary?: Resolver<Maybe<ResolversTypes['Diary']>, ParentType, ContextType, RequireFields<MutationCreateDiaryArgs, 'title' | 'userId'>>;
  createDiaryNote?: Resolver<Maybe<ResolversTypes['Diary']>, ParentType, ContextType, RequireFields<MutationCreateDiaryNoteArgs, 'title' | 'userId'>>;
};

export type QueryResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  fetchDiaries?: Resolver<Maybe<ResolversTypes['FetchDiariesResponse']>, ParentType, ContextType, RequireFields<QueryFetchDiariesArgs, 'skip' | 'take'>>;
  fetchDiaryByField?: Resolver<Maybe<ResolversTypes['FetchDiariesResponse']>, ParentType, ContextType, RequireFields<QueryFetchDiaryByFieldArgs, 'filter'>>;
  fetchDiaryById?: Resolver<Maybe<ResolversTypes['FetchDiaryResponse']>, ParentType, ContextType, RequireFields<QueryFetchDiaryByIdArgs, 'id'>>;
  fetchDiaryNoteById?: Resolver<Maybe<ResolversTypes['FetchDiaryNoteResponse']>, ParentType, ContextType, RequireFields<QueryFetchDiaryNoteByIdArgs, 'id'>>;
  fetchDiaryNotes?: Resolver<Maybe<ResolversTypes['FetchDiaryNotesResponse']>, ParentType, ContextType, RequireFields<QueryFetchDiaryNotesArgs, 'skip' | 'take'>>;
  fetchDiaryNotesByField?: Resolver<Maybe<ResolversTypes['FetchDiaryNotesResponse']>, ParentType, ContextType, RequireFields<QueryFetchDiaryNotesByFieldArgs, 'filter'>>;
  fetchUserById?: Resolver<Maybe<ResolversTypes['FetchUserResponse']>, ParentType, ContextType, RequireFields<QueryFetchUserByIdArgs, 'id'>>;
  fetchUsers?: Resolver<Maybe<ResolversTypes['FetchUsersResponse']>, ParentType, ContextType, RequireFields<QueryFetchUsersArgs, 'skip' | 'take'>>;
  fetchUsersByField?: Resolver<Maybe<ResolversTypes['FetchUsersResponse']>, ParentType, ContextType, RequireFields<QueryFetchUsersByFieldArgs, 'filter'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  authUserId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletedDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  diaries?: Resolver<Maybe<Array<Maybe<ResolversTypes['Diary']>>>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = DataSourceContext> = {
  DateTime?: GraphQLScalarType;
  Diary?: DiaryResolvers<ContextType>;
  DiaryNote?: DiaryNoteResolvers<ContextType>;
  FetchDiariesResponse?: FetchDiariesResponseResolvers<ContextType>;
  FetchDiaryNoteResponse?: FetchDiaryNoteResponseResolvers<ContextType>;
  FetchDiaryNotesResponse?: FetchDiaryNotesResponseResolvers<ContextType>;
  FetchDiaryResponse?: FetchDiaryResponseResolvers<ContextType>;
  FetchUserResponse?: FetchUserResponseResolvers<ContextType>;
  FetchUsersResponse?: FetchUsersResponseResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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

export type DeleteResponse = {
  __typename?: 'DeleteResponse';
  code: Scalars['Int']['output'];
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Diary = {
  __typename?: 'Diary';
  createdDate: Scalars['DateTime']['output'];
  deletedDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  notes: Array<Maybe<DiaryNote>>;
  title: Scalars['String']['output'];
  updatedDate?: Maybe<Scalars['DateTime']['output']>;
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
  createdDate: Scalars['DateTime']['output'];
  deletedDate?: Maybe<Scalars['DateTime']['output']>;
  diaryId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  images: Array<Maybe<Image>>;
  text?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedDate?: Maybe<Scalars['DateTime']['output']>;
  version: Scalars['Int']['output'];
};

export type DiaryNoteFilterOpts = {
  field: Scalars['String']['input'];
  intValue?: InputMaybe<Scalars['Int']['input']>;
  stringValue?: InputMaybe<Scalars['String']['input']>;
};

export type Image = {
  __typename?: 'Image';
  title?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDiary?: Maybe<ReadDiaryResponse>;
  createDiaryNote?: Maybe<ReadDiaryNoteResponse>;
  createUser?: Maybe<ReadUserResponse>;
  deleteDiary?: Maybe<ReadDiaryResponse>;
  deleteDiaryNote?: Maybe<DeleteResponse>;
  deleteUser?: Maybe<DeleteResponse>;
  updateDiary?: Maybe<ReadDiaryResponse>;
  updateDiaryNote?: Maybe<ReadDiaryNoteResponse>;
  updateUser?: Maybe<ReadUserResponse>;
};


export type MutationCreateDiaryArgs = {
  title: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationCreateDiaryNoteArgs = {
  diaryId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  authUserId: Scalars['ID']['input'];
  email: Scalars['String']['input'];
  locale: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationDeleteDiaryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteDiaryNoteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateDiaryArgs = {
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateDiaryNoteArgs = {
  id: Scalars['ID']['input'];
  text?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  points?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  readDiaries?: Maybe<ReadDiariesResponse>;
  readDiaryById?: Maybe<ReadDiaryResponse>;
  readDiaryNoteById?: Maybe<ReadDiaryNoteResponse>;
  readDiaryNotes?: Maybe<ReadDiaryNotesResponse>;
  readUserById?: Maybe<ReadUserResponse>;
  readUsers?: Maybe<ReadUsersResponse>;
};


export type QueryReadDiariesArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};


export type QueryReadDiaryByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryReadDiaryNoteByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryReadDiaryNotesArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};


export type QueryReadUserByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryReadUsersArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type ReadDiariesResponse = {
  __typename?: 'ReadDiariesResponse';
  code: Scalars['Int']['output'];
  count?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<Diary>>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type ReadDiaryNoteResponse = {
  __typename?: 'ReadDiaryNoteResponse';
  code: Scalars['Int']['output'];
  data?: Maybe<DiaryNote>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type ReadDiaryNotesResponse = {
  __typename?: 'ReadDiaryNotesResponse';
  code: Scalars['Int']['output'];
  count?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<DiaryNote>>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type ReadDiaryResponse = {
  __typename?: 'ReadDiaryResponse';
  code: Scalars['Int']['output'];
  data?: Maybe<Diary>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type ReadUserResponse = {
  __typename?: 'ReadUserResponse';
  code: Scalars['Int']['output'];
  data?: Maybe<User>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type ReadUsersResponse = {
  __typename?: 'ReadUsersResponse';
  code: Scalars['Int']['output'];
  count?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<User>>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  active?: Maybe<Scalars['Boolean']['output']>;
  authUserId: Scalars['String']['output'];
  createdDate: Scalars['DateTime']['output'];
  deletedDate?: Maybe<Scalars['DateTime']['output']>;
  diaries?: Maybe<Array<Maybe<Diary>>>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  permissions: Array<Maybe<Scalars['String']['output']>>;
  points?: Maybe<Scalars['Int']['output']>;
  updatedDate?: Maybe<Scalars['DateTime']['output']>;
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
  DeleteResponse: ResolverTypeWrapper<DeleteResponse>;
  Diary: ResolverTypeWrapper<Diary>;
  DiaryFilterOpts: DiaryFilterOpts;
  DiaryNote: ResolverTypeWrapper<DiaryNote>;
  DiaryNoteFilterOpts: DiaryNoteFilterOpts;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Image: ResolverTypeWrapper<Image>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ReadDiariesResponse: ResolverTypeWrapper<ReadDiariesResponse>;
  ReadDiaryNoteResponse: ResolverTypeWrapper<ReadDiaryNoteResponse>;
  ReadDiaryNotesResponse: ResolverTypeWrapper<ReadDiaryNotesResponse>;
  ReadDiaryResponse: ResolverTypeWrapper<ReadDiaryResponse>;
  ReadUserResponse: ResolverTypeWrapper<ReadUserResponse>;
  ReadUsersResponse: ResolverTypeWrapper<ReadUsersResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserFilterOpts: UserFilterOpts;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  DateTime: Scalars['DateTime']['output'];
  DeleteResponse: DeleteResponse;
  Diary: Diary;
  DiaryFilterOpts: DiaryFilterOpts;
  DiaryNote: DiaryNote;
  DiaryNoteFilterOpts: DiaryNoteFilterOpts;
  ID: Scalars['ID']['output'];
  Image: Image;
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  ReadDiariesResponse: ReadDiariesResponse;
  ReadDiaryNoteResponse: ReadDiaryNoteResponse;
  ReadDiaryNotesResponse: ReadDiaryNotesResponse;
  ReadDiaryResponse: ReadDiaryResponse;
  ReadUserResponse: ReadUserResponse;
  ReadUsersResponse: ReadUsersResponse;
  String: Scalars['String']['output'];
  User: User;
  UserFilterOpts: UserFilterOpts;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeleteResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteResponse'] = ResolversParentTypes['DeleteResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Diary'] = ResolversParentTypes['Diary']> = {
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletedDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  notes?: Resolver<Array<Maybe<ResolversTypes['DiaryNote']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiaryNoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiaryNote'] = ResolversParentTypes['DiaryNote']> = {
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletedDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  diaryId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<Maybe<ResolversTypes['Image']>>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = {
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createDiary?: Resolver<Maybe<ResolversTypes['ReadDiaryResponse']>, ParentType, ContextType, RequireFields<MutationCreateDiaryArgs, 'title' | 'userId'>>;
  createDiaryNote?: Resolver<Maybe<ResolversTypes['ReadDiaryNoteResponse']>, ParentType, ContextType, RequireFields<MutationCreateDiaryNoteArgs, 'diaryId' | 'text' | 'title'>>;
  createUser?: Resolver<Maybe<ResolversTypes['ReadUserResponse']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'authUserId' | 'email' | 'locale' | 'name'>>;
  deleteDiary?: Resolver<Maybe<ResolversTypes['ReadDiaryResponse']>, ParentType, ContextType, RequireFields<MutationDeleteDiaryArgs, 'id'>>;
  deleteDiaryNote?: Resolver<Maybe<ResolversTypes['DeleteResponse']>, ParentType, ContextType, RequireFields<MutationDeleteDiaryNoteArgs, 'id'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['DeleteResponse']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  updateDiary?: Resolver<Maybe<ResolversTypes['ReadDiaryResponse']>, ParentType, ContextType, RequireFields<MutationUpdateDiaryArgs, 'id'>>;
  updateDiaryNote?: Resolver<Maybe<ResolversTypes['ReadDiaryNoteResponse']>, ParentType, ContextType, RequireFields<MutationUpdateDiaryNoteArgs, 'id' | 'title'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['ReadUserResponse']>, ParentType, ContextType, Partial<MutationUpdateUserArgs>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  readDiaries?: Resolver<Maybe<ResolversTypes['ReadDiariesResponse']>, ParentType, ContextType, RequireFields<QueryReadDiariesArgs, 'skip' | 'take'>>;
  readDiaryById?: Resolver<Maybe<ResolversTypes['ReadDiaryResponse']>, ParentType, ContextType, RequireFields<QueryReadDiaryByIdArgs, 'id'>>;
  readDiaryNoteById?: Resolver<Maybe<ResolversTypes['ReadDiaryNoteResponse']>, ParentType, ContextType, RequireFields<QueryReadDiaryNoteByIdArgs, 'id'>>;
  readDiaryNotes?: Resolver<Maybe<ResolversTypes['ReadDiaryNotesResponse']>, ParentType, ContextType, RequireFields<QueryReadDiaryNotesArgs, 'skip' | 'take'>>;
  readUserById?: Resolver<Maybe<ResolversTypes['ReadUserResponse']>, ParentType, ContextType, RequireFields<QueryReadUserByIdArgs, 'id'>>;
  readUsers?: Resolver<Maybe<ResolversTypes['ReadUsersResponse']>, ParentType, ContextType, RequireFields<QueryReadUsersArgs, 'skip' | 'take'>>;
};

export type ReadDiariesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReadDiariesResponse'] = ResolversParentTypes['ReadDiariesResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['Diary']>>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReadDiaryNoteResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReadDiaryNoteResponse'] = ResolversParentTypes['ReadDiaryNoteResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['DiaryNote']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReadDiaryNotesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReadDiaryNotesResponse'] = ResolversParentTypes['ReadDiaryNotesResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['DiaryNote']>>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReadDiaryResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReadDiaryResponse'] = ResolversParentTypes['ReadDiaryResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['Diary']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReadUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReadUserResponse'] = ResolversParentTypes['ReadUserResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReadUsersResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReadUsersResponse'] = ResolversParentTypes['ReadUsersResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  authUserId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletedDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  diaries?: Resolver<Maybe<Array<Maybe<ResolversTypes['Diary']>>>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  locale?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  permissions?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  points?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  version?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  DeleteResponse?: DeleteResponseResolvers<ContextType>;
  Diary?: DiaryResolvers<ContextType>;
  DiaryNote?: DiaryNoteResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReadDiariesResponse?: ReadDiariesResponseResolvers<ContextType>;
  ReadDiaryNoteResponse?: ReadDiaryNoteResponseResolvers<ContextType>;
  ReadDiaryNotesResponse?: ReadDiaryNotesResponseResolvers<ContextType>;
  ReadDiaryResponse?: ReadDiaryResponseResolvers<ContextType>;
  ReadUserResponse?: ReadUserResponseResolvers<ContextType>;
  ReadUsersResponse?: ReadUsersResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


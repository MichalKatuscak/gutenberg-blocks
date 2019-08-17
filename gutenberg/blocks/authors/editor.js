import Select from 'react-select';

const {apiFetch} = wp;
const {registerBlockType} = wp.blocks;
const {PanelBody, PanelRow, Spinner} = wp.components;
const {registerStore, withSelect} = wp.data;
const {InnerBlocks, InspectorControls} = wp.editor;


const actions = {
    setUsers(userAuthors) {
        return {
            type: 'SET_USERS',
            userAuthors,
        };
    },
    receiveUsers(path) {
        return {
            type: 'RECEIVE_USERS',
            path,
        };
    },
};

registerStore('katuscak-gutenberg/authors', {
    reducer(state = {userAuthors: {}}, action) {
        switch (action.type) {
            case 'SET_USERS':
                return {
                    ...state,
                    userAuthors: action.userAuthors,
                };
        }

        return state;
    },

    actions,

    selectors: {
        receiveUsers(state) {
            const {userAuthors} = state;
            return userAuthors;
        },
    },

    controls: {
        RECEIVE_USERS(action) {
            return apiFetch({path: action.path});
        },
    },

    resolvers: {
        * receiveUsers() {
            const userAuthors = yield actions.receiveUsers('/katuscak-gutenberg/users/');
            return actions.setUsers(userAuthors);
        },
    },
});

const block = registerBlockType('katuscak-gutenberg/authors', {
    title: 'Autoři článku',
    icon: 'admin-users',
    category: 'layout',

    attributes: {
        user: {
            type: 'string',
            default: null,
        },
    },

    edit: withSelect((select) => ({
        userAuthors: select('katuscak-gutenberg/authors').receiveUsers(),
    }))(props => {
        const {attributes: {user}, userAuthors, className, setAttributes} = props;
        const handleUsersChange = (user) => setAttributes({user: JSON.stringify(user)});

        let selectedAuthors = [];
        if (null !== user) {
            selectedAuthors = JSON.parse(user);
        }

        if (!userAuthors.length) {
            return (
                <p className={className}>
                    <Spinner/>
                    Načítání dat
                </p>
            );
        }

        return [
            <InspectorControls>
                <PanelBody title="Autoři"
                           className="secure-block-inspector">
                    <PanelRow>
                        <Select
                            className={props.className + '__select'}
                            name='secure-block-users'
                            value={selectedAuthors}
                            onChange={handleUsersChange}
                            options={userAuthors}
                            isMulti='true'
                        />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>,

            <div className={props.className}>
                <span className={props.className + '__description'}>
                    <strong>Autoři článku: </strong>

                    {!selectedAuthors || selectedAuthors.length === 0 ?
                        <span> --- vyberte --- </span>
                        :
                        <span className={props.className + '__users'}>
                            {Object(selectedAuthors).map((value, key) =>
                                <span className={props.className + '__users_user'}>
                                    <span className={props.className + '__users_user_name'}>
                                        {value['label']}
                                    </span>
                                </span>
                            )}
                        </span>
                    }
                </span>
            </div>
        ];
    }),

    save: (props) => (
        <div className={props.className}>
            <InnerBlocks.Content/>
        </div>
    )
});

export {block}
const {registerBlockType} = wp.blocks;
const {RichText, MediaUpload, InspectorControls} = wp.editor;


const block = registerBlockType('katuscak-gutenberg/blockquote-with-image', {
    title: 'Citace s obrázkem na pozadí',
    icon: 'format-image',
    category: 'layout',

    attributes: {
        textString: {
            type: 'array',
            source: 'children',
            selector: 'p'
        },
        authorString: {
            type: 'array',
            source: 'children',
            selector: 'footer'
        },
        backgroundImage: {
            type: 'string',
            default: null
        }
    },

    edit(props) {
        const {setAttributes, attributes, className} = props;
        const {backgroundImage} = props.attributes;

        function onTextChange(changes) {
            setAttributes({
                textString: changes
            });
        }

        function onAuthorChange(changes) {
            setAttributes({
                authorString: changes
            });
        }

        function onImageSelect(imageObject) {
            setAttributes({
                backgroundImage: imageObject.sizes.full.url
            })
        }

        return ([
            <InspectorControls>
                <div>
                    <h2>Vyberte obrázek na pozadí:</h2>
                    <MediaUpload
                        onSelect={onImageSelect}
                        type="image"
                        value={backgroundImage} // make sure you destructured backgroundImage from props.attributes!
                        render={({open}) => (
                            <button onClick={open} className="components-button editor-post-featured-image__toggle">
                                Zvolit obrázek
                            </button>
                        )}
                    />
                </div>
            </InspectorControls>,

            <blockquote className={className}
                 style={{
                     backgroundImage: `url('${backgroundImage}')`,
                     backgroundPosition: 'center center',
                     backgroundSize: 'cover'
                 }}>
                <RichText
                    tagName="p"
                    className="content"
                    value={attributes.textString}
                    onChange={onTextChange}
                    placeholder="Zde napište text citace"
                />
                <RichText
                    tagName="footer"
                    className="content"
                    value={attributes.authorString}
                    onChange={onAuthorChange}
                    placeholder="Zde napište autora citace"
                />
            </blockquote>
        ]);
    },

    save(props) {

        const {attributes, className} = props;
        const {backgroundImage} = props.attributes;

        return (
            <blockquote className={className}
                 style={{
                     backgroundImage: `url('${backgroundImage}')`,
                     backgroundPosition: 'center center',
                     backgroundSize: 'cover'
                 }}>
                <RichText.Content
                    tagName="p"
                    className="content"
                    value={attributes.textString}
                />
                <RichText.Content
                    tagName="footer"
                    className="content"
                    value={attributes.authorString}
                />
            </blockquote>
        );
    }
});

export {block}
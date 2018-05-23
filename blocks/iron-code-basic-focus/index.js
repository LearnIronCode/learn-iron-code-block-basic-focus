( function( wp ) {
	/**
	 * Registers a new block provided a unique name and an object defining its behavior.
	 * @see https://github.com/WordPress/gutenberg/tree/master/blocks#api
	 */
	var registerBlockType = wp.blocks.registerBlockType;
	/**
	 * Returns a new element of given type. Element is an abstraction layer atop React.
	 * @see https://github.com/WordPress/gutenberg/tree/master/element#element
	 *
	 * TextControl Renders a text input field.
	 * @see https://github.com/WordPress/gutenberg/blob/master/components/text-control
	 */
	var el = wp.element.createElement,
		TextControl = wp.components.TextControl;
	/**
	 * Retrieves the translation of text.
	 * @see https://github.com/WordPress/gutenberg/tree/master/i18n#api
	 */
	var __ = wp.i18n.__;

	/**
	 * Every block starts by registering a new block type definition.
	 * @see https://wordpress.org/gutenberg/handbook/block-api/
	 */
	registerBlockType( 'learn-iron-code-block-basic-focus/iron-code-basic-focus', {
		/**
		 * This is the display title for your block, which can be translated with `i18n` functions.
		 * The block inserter will show this name.
		 */
		title: __( 'Iron Code Basic Focus' ),

		/**
		 * Add dashicon icon in Gutenberg block selector.
		 * @see https://developer.wordpress.org/resource/dashicons/#welcome-learn-more
		 */
		icon: 'welcome-learn-more',

		/**
		 * Blocks are grouped into categories to help users browse and discover them.
		 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
		 */
		category: 'widgets',

		/**
		 * Optional block extended support features.
		 */
		supports: {
			// Removes support for an HTML mode.
			html: false,
		},

		/**
		 * The edit function describes the structure of your block in the context of the editor.
		 * This represents what the editor will render when the block is used.
		 * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#edit
		 *
		 * @param {Object} [props] Properties passed from the editor.
		 * @return {Element}       Element to render.
		 */
		edit: function( props ) {
			if ( false === props.isSelected ) {
				// This block is NOT selected.
				// Use the Front-end rendering (i.e. non-editable field).
				return renderFrontEnd( props );
			}

			// We now know this block IS selected.
			// Render the editable field.

			/**
			 *
			 * Function to update "content" attribute.
			 */
			function onChangeContent( newContent ) {
				props.setAttributes( { content: newContent } );
			}

			/**
			 * Render our block for the editor using our content attribute.
			 *
			 * Additionally, assign an onChange function for updating the content attribute.
			 */
			return el(
				TextControl,
				{
					className: props.className,
					onChange: onChangeContent,
					placeHolder: __('Enter your content here'),
					value: props.attributes.content
				}
			);
		},

		/**
		 * The save function defines the way in which the different attributes should be combined
		 * into the final markup, which is then serialized by Gutenberg into `post_content`.
		 * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#save
		 *
		 * @param {Object} [props] Properties passed from the editor.
		 * @return {Element}       Element to render.
		 */
		save: function( props ) {
			return renderFrontEnd( props );
		}
	} );

	/**
	 * Render the block as it will be displayed on the front-end.
	 *
	 * @param {Object} [props] Properties passed from the editor.
	 * @return {Element}       Element to render.
	 */
	function renderFrontEnd( props ) {
		return el(
			'p',
			{
				className: props.className,
			},
			props.attributes.content
		);
	}
} )(
	window.wp
);

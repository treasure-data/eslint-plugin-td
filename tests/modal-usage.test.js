const { RuleTester } = require('eslint')
const modalUsage = require('../rules/modal-usage')

const ruleTester = new RuleTester({
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
})
ruleTester.run('modal-usage', modalUsage, {
  valid: [
    {
      code: '<SimpleModal><div>Modal Content</div></SimpleModal>',
      filename: 'simple-modal.js'
    },
    {
      code: `
        <Modal>
            <Modal.Header title="test-title">Modal Title</Modal.Header>
            <Modal.Body>Modal Body</Modal.Body>
            {props.confirm && <Modal.Footer>Confirm Message</Modal.Footer>}
        </Modal>
      `,
      filename: 'complex-modal.js'
    },
    {
      code: `
      <Modal
        show={show}
        onHide={onHide}
        footer={
          <ComponentGroup>
            <Button onClick={onHide} id={MODAL_CANCEL_ID}>
              Cancel
            </Button>
            <Button
              disabled={enteredVal !== variable}
              primary
              onClick={this._onSave}
              id={MODAL_SAVE_ID}
            >
              Save Changes
            </Button>
          </ComponentGroup>
        }
        title={\`string\`}
      >
        <div>
          <p>
            string
          </p>
          <br />
          <p>string</p>
          <br />
          <p>
            string
          </p>
          <br />
          <Input
            placeholder='Enter number...'
            value={enteredVal}
            onChange={this._onChange}
            type='number'
          />
        </div>
      </Modal>
`,
      filename: 'modal-footer-component.js'
    },
    {
      code: `
      <Modal
        backdropClassName={cn(styles.Background, backgroundClassName)}
        className={cn(styles.ReactOverlayModal, className)}
        {...otherProps}
      />
      `,
      filename: 'modal-overlay.js'
    },
    {
      code: `
      <Modal
      className={styles.Container}
      headerClass={styles.HeaderContainer}
      onHide={onHide}
      show={isActive}
      title={\`Run \${variable}\`}
    >
      {content}
    </Modal>
      `,
      filename: 'modal-without-children.js'
    }
  ],

  invalid: [
    {
      code: `
        <Modal>
            <Modal.Header>Title</Modal.Header>
            <Modal.Body>Body</Modal.Body>
            <Modal.Footer>Footer</Modal.Footer>
        </Modal>
`,
      filename: 'invalid-complex-modal.js',
      errors: [
        {
          message:
            'Please use the SimpleModal if you do not need custom functionality for header or footer'
        }
      ]
    }
  ]
})

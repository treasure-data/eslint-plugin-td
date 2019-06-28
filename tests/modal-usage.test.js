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
              disabled={enteredVal !== numberOfMasterSegments}
              primary
              onClick={this._onSave}
              id={MODAL_SAVE_ID}
            >
              Save Changes
            </Button>
          </ComponentGroup>
        }
        title={\`Permission Change Confirmation\`}
      >
        <div>
          <p>
            Changing the policy to <strong>{\`\${label}\`}</strong> will remove
            details for <strong>{\`\${numberOfMasterSegments}\`}</strong> master
            segment(s) and its folders.
          </p>
          <br />
          <p>This action can not be undone.</p>
          <br />
          <p>
            To make sure this is what you want, type the number of master
            segments that will be affected.
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
      filename: 'policy-modal.js'
    },
    {
      code: `
      <Modal
        backdropClassName={cn(styles.Background, backdropClassName)}
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
      title={\`Run \${workflowName}\`}
    >
      {content}
    </Modal>
      `,
      filename: 'workflow-modal.js'
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

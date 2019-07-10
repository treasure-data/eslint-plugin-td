# Ensure "simple" modals use `SimpleModal`

Simple modals look like this:

```
<Modal>
    <Modal.Header>Header</Modal.Header>
    <Modal.Body>Body</Modal.Body>
    <Modal.Footer><button>Do action</button></Modal.Footer>
</Modal>
```

Such modals can be implemented using `components/Modals/SimpleModals.js`:

```
<SimpleModal
  title="Header"
  confirmLabel="Do action">
  Body
</SimpleModal>
```

The `modal-usage` rule ensures that modals with a simple structure use `SimpleModal`

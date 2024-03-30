# CoreUI Notice

**[DEMO](https://n2ref.github.io/coreui-notice)**

## Install with npm
`$ npm install coreui-notice`

## Example

```html
<button class="btn btn-sm btn-secondary" id="notice-default">Default</button>
<button class="btn btn-sm btn-warning" id="notice-warning">Warning</button>
<button class="btn btn-sm btn-danger" id="notice-danger">Danger</button>
<button class="btn btn-sm btn-success" id="notice-success">Success</button>

<script>
    $('#notice-default').click(function () {
        CoreUI.notice.info("Hello, world! This is a toast message.");
    });

    $('#notice-warning').click(function () {
        CoreUI.notice.warning("Hello, world! This is a toast message.");
    });

    $('#notice-danger').click(function () {
        CoreUI.notice.danger("Hello, world! This is a toast message.");
    });

    $('#notice-success').click(function () {
        CoreUI.notice.success("Hello, world! This is a toast message.");
    });
</script>
```

Result

![Notice](https://raw.githubusercontent.com/n2ref/coreui-notice/main/preview.png)

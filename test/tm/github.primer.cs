/*! normalize.css v3.0.1 | MIT License | git.io/normalize */

html {
    font-family: sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%
}

body {
    margin: 0
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
nav,
section,
summary {
    display: block
}

audio,
canvas,
progress,
video {
    display: inline-block;
    vertical-align: baseline
}

audio:not([controls]) {
    display: none;
    height: 0
}

[hidden],
template {
    display: none
}

a {
    background: transparent
}

a:active,
a:hover {
    outline: 0
}

abbr[title] {
    border-bottom: 1px dotted
}

b,
strong {
    font-weight: bold
}

dfn {
    font-style: italic
}

h1 {
    font-size: 2em;
    margin: 0.67em 0
}

mark {
    background: #ff0;
    color: #000
}

small {
    font-size: 80%
}

sub,
sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline
}

sup {
    top: -0.5em
}

sub {
    bottom: -0.25em
}

img {
    border: 0
}

svg:not(:root) {
    overflow: hidden
}

figure {
    margin: 1em 40px
}

hr {
    box-sizing: content-box;
    height: 0
}

pre {
    overflow: auto
}

code,
kbd,
pre,
samp {
    font-family: monospace, monospace;
    font-size: 1em
}

button,
input,
optgroup,
select,
textarea {
    color: inherit;
    font: inherit;
    margin: 0
}

button {
    overflow: visible
}

button,
select {
    text-transform: none
}

button,
html input[type="button"],
input[type="reset"],
input[type="submit"] {
    -webkit-appearance: button;
    cursor: pointer
}

button[disabled],
html input[disabled] {
    cursor: default
}

button::-moz-focus-inner,
input::-moz-focus-inner {
    border: 0;
    padding: 0
}

input {
    line-height: normal
}

input[type="checkbox"],
input[type="radio"] {
    box-sizing: border-box;
    padding: 0
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    height: auto
}

input[type="search"] {
    -webkit-appearance: textfield;
    box-sizing: content-box
}

input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none
}

fieldset {
    border: 1px solid #c0c0c0;
    margin: 0 2px;
    padding: 0.35em 0.625em 0.75em
}

legend {
    border: 0;
    padding: 0
}

textarea {
    overflow: auto
}

optgroup {
    font-weight: bold
}

table {
    border-collapse: collapse;
    border-spacing: 0
}

td,
th {
    padding: 0
}

* {
    box-sizing: border-box
}

input,
select,
textarea,
button {
    font: 13px/1.4 Helvetica, arial, nimbussansl, liberationsans, freesans, clean, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"
}

body {
    font: 13px/1.4 Helvetica, arial, nimbussansl, liberationsans, freesans, clean, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
    color: #333;
    background-color: #fff
}

a {
    color: #4183c4;
    text-decoration: none
}

a:hover,
a:active {
    text-decoration: underline
}

hr,
.rule {
    height: 0;
    margin: 15px 0;
    overflow: hidden;
    background: transparent;
    border: 0;
    border-bottom: 1px solid #ddd
}

hr:before,
.rule:before {
    display: table;
    content: ""
}

hr:after,
.rule:after {
    display: table;
    clear: both;
    content: ""
}

h1,
h2,
h3,
h4,
h5,
h6 {
    margin-top: 15px;
    margin-bottom: 15px;
    line-height: 1.1
}

h1 {
    font-size: 30px
}

h2 {
    font-size: 21px
}

h3 {
    font-size: 16px
}

h4 {
    font-size: 14px
}

h5 {
    font-size: 12px
}

h6 {
    font-size: 11px
}

small {
    font-size: 90%
}

blockquote {
    margin: 0
}

.lead {
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: 300;
    color: #555
}

.text-muted {
    color: #999
}

.text-danger {
    color: #bd2c00
}

.text-emphasized {
    font-weight: bold;
    color: #333
}

ul,
ol {
    padding: 0;
    margin-top: 0;
    margin-bottom: 0
}

ol ol,
ul ol {
    list-style-type: lower-roman
}

ul ul ol,
ul ol ol,
ol ul ol,
ol ol ol {
    list-style-type: lower-alpha
}

dd {
    margin-left: 0
}

tt,
code {
    font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 12px
}

pre {
    margin-top: 0;
    margin-bottom: 0;
    font: 12px Consolas, "Liberation Mono", Menlo, Courier, monospace
}

.container {
    width: 980px;
    margin-right: auto;
    margin-left: auto
}

.container:before {
    display: table;
    content: ""
}

.container:after {
    display: table;
    clear: both;
    content: ""
}

.columns {
    margin-right: -10px;
    margin-left: -10px
}

.columns:before {
    display: table;
    content: ""
}

.columns:after {
    display: table;
    clear: both;
    content: ""
}

.column {
    float: left;
    padding-right: 10px;
    padding-left: 10px
}

.one-third {
    width: 33.333333%
}

.two-thirds {
    width: 66.666667%
}

.one-fourth {
    width: 25%
}

.one-half {
    width: 50%
}

.three-fourths {
    width: 75%
}

.one-fifth {
    width: 20%
}

.four-fifths {
    width: 80%
}

.single-column {
    padding-right: 10px;
    padding-left: 10px
}

.table-column {
    display: table-cell;
    width: 1%;
    padding-right: 10px;
    padding-left: 10px;
    vertical-align: top
}

fieldset {
    padding: 0;
    margin: 0;
    border: 0
}

label {
    font-size: 13px;
    font-weight: bold
}

.form-control,
input[type="text"],
input[type="password"],
input[type="email"],
input[type="number"],
input[type="tel"],
input[type="url"],
textarea {
    min-height: 34px;
    padding: 7px 8px;
    font-size: 13px;
    color: #333;
    vertical-align: middle;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: right center;
    border: 1px solid #ccc;
    border-radius: 3px;
    outline: none;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075)
}

.form-control.focus,
.form-control:focus,
input[type="text"].focus,
input[type="text"]:focus,
.focused .drag-and-drop,
input[type="password"].focus,
input[type="password"]:focus,
input[type="email"].focus,
input[type="email"]:focus,
input[type="number"].focus,
input[type="number"]:focus,
input[type="tel"].focus,
input[type="tel"]:focus,
input[type="url"].focus,
input[type="url"]:focus,
textarea.focus,
textarea:focus {
    border-color: #51a7e8;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075), 0 0 5px rgba(81, 167, 232, 0.5)
}

input.input-contrast,
.input-contrast {
    background-color: #fafafa
}

input.input-contrast:focus,
.input-contrast:focus {
    background-color: #fff
}

::-webkit-input-placeholder,
:-moz-placeholder {
    color: #aaa
}

::-webkit-validation-bubble-message {
    font-size: 12px;
    color: #fff;
    background: #9c2400;
    border: 0;
    border-radius: 3px;
    -webkit-box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1)
}

input::-webkit-validation-bubble-icon {
    display: none
}

::-webkit-validation-bubble-arrow {
    background-color: #9c2400;
    border: solid 1px #9c2400;
    -webkit-box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1)
}

input.input-mini {
    min-height: 26px;
    padding-top: 4px;
    padding-bottom: 4px;
    font-size: 12px
}

input.input-large {
    padding: 6px 10px;
    font-size: 16px
}

.input-block {
    display: block;
    width: 100%
}

.input-monospace {
    font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace
}

dl.form {
    margin: 15px 0
}

dl.form input[type="text"],
dl.form input[type="password"],
dl.form input[type="email"],
dl.form input[type="url"],
dl.form textarea {
    background-color: #fafafa
}

dl.form input[type="text"]:focus,
dl.form .focused .drag-and-drop,
.focused dl.form .drag-and-drop,
dl.form input[type="password"]:focus,
dl.form input[type="email"]:focus,
dl.form input[type="url"]:focus,
dl.form textarea:focus {
    background-color: #fff
}

dl.form>dt {
    margin: 0 0 6px
}

dl.form>dt label {
    position: relative
}

dl.form.flattened>dt {
    float: left;
    margin: 0;
    line-height: 32px
}

dl.form.flattened>dd {
    line-height: 32px
}

dl.form>dd input[type="text"],
dl.form>dd input[type="password"],
dl.form>dd input[type="email"],
dl.form>dd input[type="url"] {
    width: 440px;
    max-width: 100%;
    margin-right: 5px;
    background-position-x: 98%
}

dl.form>dd input.shorter {
    width: 130px
}

dl.form>dd input.short {
    width: 250px
}

dl.form>dd input.long {
    width: 100%
}

dl.form>dd textarea {
    width: 100%;
    height: 200px;
    min-height: 200px
}

dl.form>dd textarea.short {
    height: 50px;
    min-height: 50px
}

dl.form>dd h4 {
    margin: 4px 0 0
}

dl.form>dd h4.is-error {
    color: #bd2c00
}

dl.form>dd h4.is-success {
    color: #6cc644
}

dl.form>dd h4+p.note {
    margin-top: 0
}

dl.form.required>dt>label:after {
    padding-left: 5px;
    color: #9f1006;
    content: "*"
}

.note {
    min-height: 17px;
    margin: 4px 0 2px;
    font-size: 12px;
    color: #777
}

.note .spinner {
    margin-right: 3px;
    vertical-align: middle
}

.form-checkbox {
    padding-left: 20px;
    margin: 15px 0;
    vertical-align: middle
}

.form-checkbox label em.highlight {
    position: relative;
    left: -4px;
    padding: 2px 4px;
    font-style: normal;
    background: #fffbdc;
    border-radius: 3px
}

.form-checkbox input[type=checkbox],
.form-checkbox input[type=radio] {
    float: left;
    margin: 2px 0 0 -20px;
    vertical-align: middle
}

.form-checkbox .note {
    display: block;
    margin: 0;
    font-size: 12px;
    font-weight: normal;
    color: #666
}

dl.form .success,
dl.form .error,
dl.form .indicator {
    display: none;
    font-size: 12px;
    font-weight: bold
}

dl.form.loading {
    opacity: 0.5
}

dl.form.loading .indicator {
    display: inline
}

dl.form.loading .spinner {
    display: inline-block;
    vertical-align: middle
}

dl.form.successful .success {
    display: inline;
    color: #390
}

dl.form.errored>dt label {
    color: #900
}

dl.form.errored .error {
    display: inline;
    color: #900
}

dl.form.errored dd.error,
dl.form.errored dd.warning {
    display: inline-block;
    padding: 5px;
    font-size: 11px;
    color: #494620;
    background: #f7ea57;
    border: 1px solid #c0b536;
    border-top-color: #fff;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px
}

dl.form.warn .warning {
    display: inline;
    color: #900
}

dl.form.warn dd.warning {
    display: inline-block;
    padding: 5px;
    font-size: 11px;
    color: #494620;
    background: #f7ea57;
    border: 1px solid #c0b536;
    border-top-color: #fff;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px
}

dl.form .form-note {
    display: inline-block;
    padding: 5px;
    margin-top: -1px;
    font-size: 11px;
    color: #494620;
    background: #f7ea57;
    border: 1px solid #c0b536;
    border-top-color: #fff;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px
}

.hfields {
    margin: 15px 0
}

.hfields:before {
    display: table;
    content: ""
}

.hfields:after {
    display: table;
    clear: both;
    content: ""
}

.hfields dl.form {
    float: left;
    margin: 0 30px 0 0
}

.hfields dl.form>dt label {
    display: inline-block;
    margin: 5px 0 0;
    color: #666
}

.hfields dl.form>dt label img {
    position: relative;
    top: -2px
}

.hfields .btn {
    float: left;
    margin: 28px 25px 0 -20px
}

.hfields select {
    margin-top: 5px
}

html.no-dnd-uploads .drag-and-drop {
    min-height: 32px
}

html.no-dnd-uploads .drag-and-drop .default {
    display: none
}

html.no-dnd-uploads .upload-enabled textarea {
    border-bottom: 1px solid #ddd
}

.drag-and-drop {
    padding: 7px 10px;
    margin: 0;
    font-size: 13px;
    line-height: 16px;
    color: #aaa;
    background-color: #fafafa;
    border: 1px solid #ccc;
    border-top: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px
}

.drag-and-drop .default,
.drag-and-drop .loading,
.drag-and-drop .error {
    display: none
}

.drag-and-drop .error {
    color: #bd2c00
}

.drag-and-drop img {
    vertical-align: top
}

.is-default .drag-and-drop .default {
    display: inline-block
}

.is-uploading .drag-and-drop .loading {
    display: inline-block
}

.is-bad-file .drag-and-drop .bad-file {
    display: inline-block
}

.is-too-big .drag-and-drop .too-big {
    display: inline-block
}

.is-empty .drag-and-drop .empty {
    display: inline-block
}

.is-bad-browser .drag-and-drop .bad-browser {
    display: inline-block
}

.drag-and-drop-error-info {
    font-weight: normal;
    color: #aaa
}

.drag-and-drop-error-info a {
    color: #4183c4
}

.is-failed .drag-and-drop .failed-request {
    display: inline-block
}

.manual-file-chooser {
    position: absolute;
    width: 240px;
    padding: 5px;
    margin-left: -80px;
    cursor: pointer;
    opacity: 0.0001
}

.manual-file-chooser:hover+.manual-file-chooser-text {
    text-decoration: underline
}

.btn .manual-file-chooser {
    top: 0;
    padding: 0;
    line-height: 34px
}

.upload-enabled textarea {
    display: block;
    border-bottom: 1px dashed #ddd;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0
}

.focused .drag-and-drop {
    box-shadow: rgba(81, 167, 232, 0.5) 0 0 3px
}

.dragover textarea,
.dragover .drag-and-drop {
    box-shadow: #c9ff00 0 0 3px
}

.previewable-comment-form {
    position: relative
}

.previewable-comment-form .tabnav {
    position: relative;
    padding: 10px 10px 0
}

.previewable-comment-form .comment {
    border: 1px solid #cacaca
}

.previewable-comment-form .comment-header .comment-header-actions {
    display: none
}

.previewable-comment-form .comment-form-error {
    margin-bottom: 10px
}

.previewable-comment-form .write-content,
.previewable-comment-form .preview-content {
    display: none;
    padding: 0 10px 10px
}

.previewable-comment-form.write-selected .write-content,
.previewable-comment-form.preview-selected .preview-content {
    display: block
}

.previewable-comment-form textarea {
    display: block;
    width: 100%;
    min-height: 100px;
    max-height: 500px;
    padding: 10px;
    resize: vertical
}

.previewable-comment-form textarea.fullscreen-contents:focus {
    border: 0;
    box-shadow: none
}

div.composer {
    margin-top: 0;
    border: 0
}

.composer .comment-form-textarea {
    height: 200px;
    min-height: 200px
}

.composer-infobar {
    height: 35px;
    padding: 0 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee
}

.composer .tabnav {
    margin: 0 0 10px
}

.infobar-widget.milestone {
    position: relative;
    float: right
}

.infobar-widget.milestone .select-menu-modal-holder {
    right: 0
}

.infobar-widget.assignee {
    float: left
}

.infobar-widget.assignee .css-truncate-target {
    max-width: 110px
}

.infobar-widget .text,
.infobar-widget .avatar,
.infobar-widget .select-menu {
    display: inline-block;
    vertical-align: top
}

.infobar-widget .text {
    margin-top: 3px
}

.infobar-widget .text a {
    font-weight: bold;
    color: #333
}

.infobar-widget .progress-bar {
    width: 200px;
    overflow: hidden;
    line-height: 18px
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none
}

.input-group {
    display: table
}

.input-group input {
    position: relative;
    width: 100%
}

.input-group input:focus {
    z-index: 2
}

.input-group input[type="text"]+.btn {
    margin-left: 0
}

.input-group.inline {
    display: inline-table
}

.input-group input,
.input-group-button {
    display: table-cell
}

.input-group-button {
    width: 1%;
    vertical-align: middle
}

.input-group input:first-child,
.input-group-button:first-child .btn {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0
}

.input-group-button:first-child .btn {
    margin-right: -1px
}

.input-group input:last-child,
.input-group-button:last-child .btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0
}

.input-group-button:last-child .btn {
    margin-left: -1px
}

h2.account {
    margin: 15px 0 0;
    font-size: 18px;
    font-weight: normal;
    color: #666
}

p.explain {
    position: relative;
    font-size: 12px;
    color: #666
}

p.explain strong {
    color: #333
}

p.explain .octicon {
    margin-right: 5px;
    color: #bbb
}

p.explain .minibutton {
    top: -4px;
    float: right
}

.options-content p.explain {
    padding: 10px 10px 0;
    margin-top: 0;
    border-top: 1px solid #ddd
}

.form-actions:before {
    display: table;
    content: ""
}

.form-actions:after {
    display: table;
    clear: both;
    content: ""
}

.form-actions .btn {
    float: right
}

.form-actions .btn+.btn {
    margin-right: 5px
}

.form-warning {
    padding: 8px 10px;
    margin: 10px 0;
    font-size: 14px;
    color: #333;
    background: #ffffe2;
    border: 1px solid #e7e4c2;
    border-radius: 4px
}

.form-warning p {
    margin: 0;
    line-height: 1.5
}

.form-warning strong {
    color: #000
}

.form-warning a {
    font-weight: bold
}

.status-indicator {
    font: normal normal 16px/1 "octicons";
    display: inline-block;
    text-decoration: none;
    -webkit-font-smoothing: antialiased;
    margin-left: 5px
}

.status-indicator-success:before {
    color: #6cc644;
    content: "\f03a"
}

.status-indicator-failed:before {
    color: #bd2c00;
    content: "\f02d"
}

.clearfix:before {
    display: table;
    content: ""
}

.clearfix:after {
    display: table;
    clear: both;
    content: ""
}

.right {
    float: right
}

.left {
    float: left
}

.text-right {
    text-align: right
}

.text-left {
    text-align: left
}

.danger {
    color: #c00
}

.mute {
    color: #000
}

.text-diff-added {
    color: #55a532
}

.text-diff-deleted {
    color: #bd2c00
}

.text-open,
.text-success {
    color: #6cc644
}

.text-closed {
    color: #bd2c00
}

.text-reverted {
    color: #bd2c00
}

.text-merged {
    color: #6e5494
}

.text-renamed {
    color: #fffa5d
}

.text-pending {
    color: #cea61b
}

.text-error,
.text-failure {
    color: #bd2c00
}

.muted-link {
    color: #777
}

.muted-link:hover {
    color: #4183c4;
    text-decoration: none
}

.hidden {
    display: none
}

.warning {
    padding: 0.5em;
    margin-bottom: 0.8em;
    font-weight: bold;
    background-color: #fffccc
}

.error_box {
    padding: 1em;
    font-weight: bold;
    background-color: #ffebe8;
    border: 1px solid #dd3c10
}

.flash-messages {
    margin-top: 15px;
    margin-bottom: 15px
}

.flash,
.flash-global {
    position: relative;
    font-size: 14px;
    line-height: 1.6;
    color: #246;
    background-color: #e2eef9;
    border: solid 1px #bac6d3
}

.flash.flash-warn,
.flash-global.flash-warn {
    color: #4c4a42;
    background-color: #fff9ea;
    border-color: #dfd8c2
}

.flash.flash-error,
.flash-global.flash-error {
    color: #911;
    background-color: #fcdede;
    border-color: #d2b2b2
}

.flash .flash-close,
.flash-global .flash-close {
    float: right;
    padding: 17px;
    margin-top: -15px;
    margin-right: -15px;
    margin-left: 20px;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    opacity: 0.6
}

.flash .flash-close:hover,
.flash-global .flash-close:hover {
    opacity: 1
}

.flash p:last-child,
.flash-global p:last-child {
    margin-bottom: 0
}

.flash .flash-action,
.flash-global .flash-action {
    float: right;
    margin-top: -4px;
    margin-left: 20px
}

.flash a,
.flash-global a {
    font-weight: bold
}

.flash {
    padding: 15px;
    border-radius: 3px
}

.flash+.flash {
    margin-top: 5px
}

.flash-with-icon {
    padding-left: 40px
}

.flash-with-icon>.octicon {
    float: left;
    margin-top: 3px;
    margin-left: -25px
}

.flash-global {
    padding: 10px;
    margin-top: -1px;
    border-width: 1px 0
}

.flash-global h2,
.flash-global p {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 1.4
}

.flash-global .flash-action {
    margin-top: 5px
}

.flash-title {
    margin-top: 0;
    margin-bottom: 5px
}

.avatar {
    display: inline-block;
    overflow: hidden;
    line-height: 1;
    vertical-align: middle;
    border-radius: 3px
}

.avatar-small {
    border-radius: 2px
}

.avatar-link {
    float: left;
    line-height: 1
}

.avatar-group-item {
    display: inline-block;
    margin-bottom: 3px
}

.avatar-parent-child {
    position: relative
}

.avatar-child {
    position: absolute;
    right: -15%;
    bottom: -9%;
    border-radius: 2px;
    box-shadow: -2px -2px 0 rgba(255, 255, 255, 0.8)
}

.blankslate {
    position: relative;
    padding: 30px;
    text-align: center;
    background-color: #fafafa;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05)
}

.blankslate.clean-background {
    background: none;
    border: 0;
    box-shadow: none
}

.blankslate.capped {
    border-radius: 0 0 3px 3px
}

.blankslate.spacious {
    padding: 100px 60px 120px
}

.blankslate.has-fixed-width {
    width: 485px;
    margin: 0 auto
}

.blankslate.large-format h3 {
    margin: 0.75em 0;
    font-size: 20px
}

.blankslate.large-format p {
    font-size: 16px
}

.blankslate.large-format p.has-fixed-width {
    width: 540px;
    margin: 0 auto;
    text-align: left
}

.blankslate.large-format .mega-octicon {
    width: 40px;
    height: 40px;
    font-size: 40px;
    color: #aaa
}

.blankslate.large-format .octicon-inbox {
    font-size: 48px;
    line-height: 40px
}

.blankslate code {
    padding: 2px 5px 3px;
    font-size: 14px;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 3px
}

.blankslate>.mega-octicon {
    color: #aaa
}

.blankslate .mega-octicon+.mega-octicon {
    margin-left: 10px
}

.tabnav+.blankslate {
    margin-top: 20px
}

.blankslate .context-loader.large-format-loader {
    padding-top: 50px
}

.spinner-forking {
    display: block;
    margin: 20px auto 40px
}

.forking-repo {
    margin: 40px 0;
    text-align: center
}

.forking-repo h3 {
    margin-bottom: 10px;
    font-size: 28px;
    font-weight: 300
}

.forking-repo h4 {
    margin: 0 0 30px;
    font-size: 16px;
    font-weight: 300
}

.counter {
    display: inline-block;
    padding: 2px 5px;
    font-size: 11px;
    font-weight: bold;
    line-height: 1;
    color: #777;
    background-color: #eee;
    border-radius: 20px
}

.btn {
    position: relative;
    display: inline-block;
    padding: 6px 12px;
    font-size: 13px;
    font-weight: bold;
    line-height: 20px;
    color: #333;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    background-color: #eee;
    background-image: linear-gradient(#fcfcfc, #eee);
    border: 1px solid #d5d5d5;
    border-radius: 3px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-appearance: none
}

.btn i {
    font-style: normal;
    font-weight: 500;
    opacity: 0.6
}

.btn .octicon {
    vertical-align: text-top
}

.btn .counter {
    text-shadow: none;
    background-color: #e5e5e5
}

.btn:focus {
    text-decoration: none;
    border-color: #51a7e8;
    outline: none;
    box-shadow: 0 0 5px rgba(81, 167, 232, 0.5)
}

.btn:hover,
.btn:active,
.btn.zeroclipboard-is-hover,
.btn.zeroclipboard-is-active {
    text-decoration: none;
    background-color: #ddd;
    background-image: linear-gradient(#eee, #ddd);
    border-color: #ccc
}

.btn:active,
.btn.selected,
.btn.selected:hover,
.btn.zeroclipboard-is-active {
    background-color: #dcdcdc;
    background-image: none;
    border-color: #b5b5b5;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15)
}

.btn:disabled,
.btn:disabled:hover,
.btn.disabled,
.btn.disabled:hover {
    color: rgba(102, 102, 102, 0.5);
    cursor: default;
    background-color: rgba(229, 229, 229, 0.5);
    background-image: none;
    border-color: rgba(197, 197, 197, 0.5);
    box-shadow: none
}

.btn-primary {
    color: #fff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.15);
    background-color: #60b044;
    background-image: linear-gradient(#8add6d, #60b044);
    border-color: #5ca941
}

.btn-primary .counter {
    color: #60b044;
    background-color: #fff
}

.btn-primary:hover {
    color: #fff;
    background-color: #569e3d;
    background-image: linear-gradient(#79d858, #569e3d);
    border-color: #4a993e
}

.btn-primary:active,
.btn-primary.selected {
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
    background-color: #569e3d;
    background-image: none;
    border-color: #418737
}

.btn-primary:disabled,
.btn-primary:disabled:hover,
.btn-primary.disabled,
.btn-primary.disabled:hover {
    color: #fefefe;
    background-color: #add39f;
    background-image: linear-gradient(#c3ecb4, #add39f);
    border-color: #b9dcac #b9dcac #a7c89b
}

.btn-danger {
    color: #900
}

.btn-danger:hover {
    color: #fff;
    background-color: #b33630;
    background-image: linear-gradient(#dc5f59, #b33630);
    border-color: #cd504a
}

.btn-danger:active,
.btn-danger.selected {
    color: #fff;
    background-color: #b33630;
    background-image: none;
    border-color: #9f312c
}

.btn-danger:disabled,
.btn-danger:disabled:hover,
.btn-danger.disabled,
.btn-danger.disabled:hover {
    color: #cb7f7f;
    background-color: #efefef;
    background-image: linear-gradient(#fefefe, #efefef);
    border-color: #e1e1e1
}

.btn-danger:hover .counter,
.btn-danger:active .counter,
.btn-danger.selected .counter {
    color: #b33630;
    background-color: #fff
}

.btn-outline {
    color: #4183c4;
    background-color: #fff;
    background-image: none;
    border: 1px solid #e5e5e5
}

.btn-outline .counter {
    background-color: #eee
}

.btn-outline:hover,
.btn-outline:active,
.btn-outline.selected,
.btn-outline.selected:hover,
.btn-outline.zeroclipboard-is-hover,
.btn-outline.zeroclipboard-is-active {
    color: #fff;
    background-color: #4183c4;
    background-image: none;
    border-color: #4183c4
}

.btn-outline:hover .counter,
.btn-outline:active .counter,
.btn-outline.selected .counter,
.btn-outline.selected:hover .counter,
.btn-outline.zeroclipboard-is-hover .counter,
.btn-outline.zeroclipboard-is-active .counter {
    color: #4183c4;
    background-color: #fff
}

.btn-outline:disabled,
.btn-outline:disabled:hover,
.btn-outline.disabled,
.btn-outline.disabled:hover {
    color: #777;
    background-color: #fff;
    background-image: none;
    border-color: #e5e5e5
}

.btn-with-count {
    float: left;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0
}

.btn-sm {
    padding: 2px 10px
}

.hidden-text-expander {
    display: block
}

.hidden-text-expander.inline {
    position: relative;
    top: -1px;
    display: inline-block;
    margin-left: 5px;
    line-height: 0
}

.hidden-text-expander a {
    display: inline-block;
    height: 12px;
    padding: 0 5px;
    font-size: 12px;
    font-weight: bold;
    line-height: 6px;
    color: #555;
    text-decoration: none;
    vertical-align: middle;
    background: #ddd;
    border-radius: 1px
}

.hidden-text-expander a:hover {
    text-decoration: none;
    background-color: #ccc
}

.hidden-text-expander a:active {
    color: #fff;
    background-color: #4183c4
}

.social-count {
    float: left;
    padding: 2px 7px;
    font-size: 11px;
    font-weight: bold;
    line-height: 20px;
    color: #333;
    vertical-align: middle;
    background-color: #fff;
    border: 1px solid #ddd;
    border-left: 0;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px
}

.social-count:hover,
.social-count:active {
    text-decoration: none
}

.social-count:hover {
    color: #4183c4;
    cursor: pointer
}

.btn-block {
    display: block;
    width: 100%;
    text-align: center
}

.btn-group {
    display: inline-block;
    vertical-align: middle
}

.btn-group:before {
    display: table;
    content: ""
}

.btn-group:after {
    display: table;
    clear: both;
    content: ""
}

.btn-group .btn {
    position: relative;
    float: left
}

.btn-group .btn:not(:first-child):not(:last-child) {
    border-radius: 0
}

.btn-group .btn:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0
}

.btn-group .btn:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0
}

.btn-group .btn:hover,
.btn-group .btn:focus,
.btn-group .btn:active,
.btn-group .btn.selected {
    z-index: 2
}

.btn-group .btn+.btn {
    margin-left: -1px;
    box-shadow: inset 1px 0 0 rgba(255, 255, 255, 0.2)
}

.btn-group .btn+.btn:hover {
    box-shadow: none
}

.btn-group .btn+.btn:active,
.btn-group .btn+.btn.selected {
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.15)
}

.btn-group .button_to+.button_to {
    margin-left: -1px
}

.btn-group .button_to {
    float: left
}

.btn-group .button_to .btn {
    border-radius: 0
}

.btn-group .button_to:first-child .btn {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px
}

.btn-group .button_to:last-child .btn {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px
}

.btn-group+.btn-group,
.btn-group+.btn {
    margin-left: 5px
}

.btn-link {
    display: inline-block;
    padding: 0;
    font-size: inherit;
    color: #4183c4;
    white-space: nowrap;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-appearance: none
}

.btn-link:hover,
.btn-link:focus {
    text-decoration: underline
}

.btn-link:focus {
    outline: none
}

.menu {
    margin-bottom: 15px;
    list-style: none;
    background-color: #fff;
    border: 1px solid #d8d8d8;
    border-radius: 3px
}

.menu-item {
    position: relative;
    display: block;
    padding: 8px 10px;
    text-shadow: 0 1px 0 #fff;
    border-bottom: 1px solid #eee
}

.menu-item:first-child {
    border-top: 0;
    border-top-right-radius: 2px;
    border-top-left-radius: 2px
}

.menu-item:first-child:before {
    border-top-left-radius: 2px
}

.menu-item:last-child {
    border-bottom: 0;
    border-bottom-right-radius: 2px;
    border-bottom-left-radius: 2px
}

.menu-item:last-child:before {
    border-bottom-left-radius: 2px
}

.menu-item:hover {
    text-decoration: none;
    background-color: #f9f9f9
}

.menu-item.selected {
    font-weight: bold;
    color: #222;
    cursor: default;
    background-color: #fff
}

.menu-item.selected:before {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 2px;
    content: "";
    background-color: #d26911
}

.menu-item .octicon {
    margin-right: 5px;
    width: 16px;
    color: #333;
    text-align: center
}

.menu-item .counter {
    float: right;
    margin-left: 5px
}

.menu-item .menu-warning {
    float: right;
    color: #d26911
}

.menu-item .avatar {
    float: left;
    margin-right: 5px
}

.menu-item.alert .counter {
    color: #bd2c00
}

.menu-heading {
    display: block;
    padding: 8px 10px;
    margin-top: 0;
    margin-bottom: 0;
    font-size: 13px;
    font-weight: bold;
    line-height: 20px;
    color: #555;
    background-color: #f7f7f7;
    border-bottom: 1px solid #eee
}

.menu-heading:hover {
    text-decoration: none
}

.menu-heading:first-child {
    border-top-right-radius: 2px;
    border-top-left-radius: 2px
}

.menu-heading:last-child {
    border-bottom-right-radius: 2px;
    border-bottom-left-radius: 2px;
    border-bottom: 0
}

.tabnav {
    margin-top: 0;
    margin-bottom: 15px;
    border-bottom: 1px solid #ddd
}

.tabnav .counter {
    margin-left: 5px
}

.tabnav-tabs {
    margin-bottom: -1px
}

.tabnav-tab {
    display: inline-block;
    padding: 8px 12px;
    font-size: 14px;
    line-height: 20px;
    color: #666;
    text-decoration: none;
    border: 1px solid transparent;
    border-bottom: 0
}

.tabnav-tab.selected {
    color: #333;
    background-color: #fff;
    border-color: #ddd;
    border-radius: 3px 3px 0 0
}

.tabnav-tab:hover {
    text-decoration: none
}

.tabnav-extra {
    display: inline-block;
    padding-top: 10px;
    margin-left: 10px;
    font-size: 12px;
    color: #666
}

.tabnav-extra>.octicon {
    margin-right: 2px
}

a.tabnav-extra:hover {
    color: #4183c4;
    text-decoration: none
}

.tabnav-btn {
    margin-left: 10px
}

.filter-list {
    list-style-type: none
}

.filter-list.small .filter-item {
    padding: 4px 10px;
    margin: 0 0 2px;
    font-size: 12px
}

.filter-list.pjax-active .filter-item {
    color: #777;
    background-color: transparent
}

.filter-list.pjax-active .filter-item.pjax-active {
    color: #fff;
    background-color: #4183c4
}

.filter-item {
    position: relative;
    display: block;
    padding: 8px 10px;
    margin-bottom: 5px;
    overflow: hidden;
    font-size: 14px;
    color: #777;
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    border-radius: 3px
}

.filter-item:hover {
    text-decoration: none;
    background-color: #eee
}

.filter-item.selected {
    color: #fff;
    background-color: #4183c4
}

.filter-item.selected .octicon-remove-close {
    float: right;
    opacity: 0.8
}

.filter-item .count {
    float: right;
    font-weight: bold
}

.filter-item .bar {
    position: absolute;
    top: 2px;
    right: 0;
    bottom: 2px;
    z-index: -1;
    display: inline-block;
    background-color: #f1f1f1
}

.state {
    display: inline-block;
    padding: 4px 8px;
    font-weight: bold;
    line-height: 20px;
    color: #fff;
    text-align: center;
    border-radius: 3px;
    background-color: #999
}

.state-open,
.state-proposed,
.state-reopened {
    background-color: #6cc644
}

.state-merged {
    background-color: #6e5494
}

.state-closed {
    background-color: #bd2c00
}

.state-renamed {
    background-color: #fffa5d
}

.tooltipped {
    position: relative
}

.tooltipped:after {
    position: absolute;
    z-index: 1000000;
    display: none;
    padding: 5px 8px;
    font: normal normal 11px/1.5 Helvetica, arial, nimbussansl, liberationsans, freesans, clean, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
    color: #fff;
    text-align: center;
    text-decoration: none;
    text-shadow: none;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: break-word;
    white-space: pre;
    pointer-events: none;
    content: attr(aria-label);
    background: rgba(0, 0, 0, 0.8);
    border-radius: 3px;
    -webkit-font-smoothing: subpixel-antialiased
}

.tooltipped:before {
    position: absolute;
    z-index: 1000001;
    display: none;
    width: 0;
    height: 0;
    color: rgba(0, 0, 0, 0.8);
    pointer-events: none;
    content: "";
    border: 5px solid transparent
}

.tooltipped:hover:before,
.tooltipped:hover:after,
.tooltipped:active:before,
.tooltipped:active:after,
.tooltipped:focus:before,
.tooltipped:focus:after {
    display: inline-block;
    text-decoration: none
}

.tooltipped-multiline:hover:after,
.tooltipped-multiline:active:after,
.tooltipped-multiline:focus:after {
    display: table-cell
}

.tooltipped-s:after,
.tooltipped-se:after,
.tooltipped-sw:after {
    top: 100%;
    right: 50%;
    margin-top: 5px
}

.tooltipped-s:before,
.tooltipped-se:before,
.tooltipped-sw:before {
    top: auto;
    right: 50%;
    bottom: -5px;
    margin-right: -5px;
    border-bottom-color: rgba(0, 0, 0, 0.8)
}

.tooltipped-se:after {
    right: auto;
    left: 50%;
    margin-left: -15px
}

.tooltipped-sw:after {
    margin-right: -15px
}

.tooltipped-n:after,
.tooltipped-ne:after,
.tooltipped-nw:after {
    right: 50%;
    bottom: 100%;
    margin-bottom: 5px
}

.tooltipped-n:before,
.tooltipped-ne:before,
.tooltipped-nw:before {
    top: -5px;
    right: 50%;
    bottom: auto;
    margin-right: -5px;
    border-top-color: rgba(0, 0, 0, 0.8)
}

.tooltipped-ne:after {
    right: auto;
    left: 50%;
    margin-left: -15px
}

.tooltipped-nw:after {
    margin-right: -15px
}

.tooltipped-s:after,
.tooltipped-n:after {
    -webkit-transform: translateX(50%);
    -ms-transform: translateX(50%);
    transform: translateX(50%)
}

.tooltipped-w:after {
    right: 100%;
    bottom: 50%;
    margin-right: 5px;
    -webkit-transform: translateY(50%);
    -ms-transform: translateY(50%);
    transform: translateY(50%)
}

.tooltipped-w:before {
    top: 50%;
    bottom: 50%;
    left: -5px;
    margin-top: -5px;
    border-left-color: rgba(0, 0, 0, 0.8)
}

.tooltipped-e:after {
    bottom: 50%;
    left: 100%;
    margin-left: 5px;
    -webkit-transform: translateY(50%);
    -ms-transform: translateY(50%);
    transform: translateY(50%)
}

.tooltipped-e:before {
    top: 50%;
    right: -5px;
    bottom: 50%;
    margin-top: -5px;
    border-right-color: rgba(0, 0, 0, 0.8)
}

.tooltipped-multiline:after {
    width: -moz-max-content;
    width: -webkit-max-content;
    max-width: 250px;
    word-break: break-word;
    word-wrap: normal;
    white-space: pre-line;
    border-collapse: separate
}

.tooltipped-multiline.tooltipped-s:after,
.tooltipped-multiline.tooltipped-n:after {
    right: auto;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%)
}

.tooltipped-multiline.tooltipped-w:after,
.tooltipped-multiline.tooltipped-e:after {
    right: 100%
}

@media screen and (min-width: 0\0) {
    .tooltipped-multiline:after {
        width: 250px
    }
}

.tooltipped-sticky:before,
.tooltipped-sticky:after {
    display: inline-block
}

.tooltipped-sticky.tooltipped-multiline:after {
    display: table-cell
}

.fullscreen-overlay-enabled.dark-theme .tooltipped:after {
    color: #000;
    background: rgba(255, 255, 255, 0.8)
}

.fullscreen-overlay-enabled.dark-theme .tooltipped .tooltipped-s:before,
.fullscreen-overlay-enabled.dark-theme .tooltipped .tooltipped-se:before,
.fullscreen-overlay-enabled.dark-theme .tooltipped .tooltipped-sw:before {
    border-bottom-color: rgba(255, 255, 255, 0.8)
}

.fullscreen-overlay-enabled.dark-theme .tooltipped.tooltipped-n:before,
.fullscreen-overlay-enabled.dark-theme .tooltipped.tooltipped-ne:before,
.fullscreen-overlay-enabled.dark-theme .tooltipped.tooltipped-nw:before {
    border-top-color: rgba(255, 255, 255, 0.8)
}

.fullscreen-overlay-enabled.dark-theme .tooltipped.tooltipped-e:before {
    border-right-color: rgba(255, 255, 255, 0.8)
}

.fullscreen-overlay-enabled.dark-theme .tooltipped.tooltipped-w:before {
    border-left-color: rgba(255, 255, 255, 0.8)
}

.flex-table {
    display: table
}

.flex-table-item {
    display: table-cell;
    width: 1%;
    white-space: nowrap;
    vertical-align: middle
}

.flex-table-item-primary {
    width: 99%
}

.css-truncate.css-truncate-target,
.css-truncate .css-truncate-target {
    display: inline-block;
    max-width: 125px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: top
}

.css-truncate.expandable.zeroclipboard-is-hover .css-truncate-target,
.css-truncate.expandable.zeroclipboard-is-hover.css-truncate-target,
.css-truncate.expandable:hover .css-truncate-target,
.css-truncate.expandable:hover.css-truncate-target {
    max-width: 10000px !important
}

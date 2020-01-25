<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

// HTML5 display-role reset for older browsers
article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote {
  &:before, &:after {
    content: "";
    content: none;
  }
}
q {
  &:before, &:after {
    content: "";
    content: none;
  }
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  font: 100% Helvetica, sans-serif;
  color: #000;
}
.center {
  margin: auto;
}
.angular-with-newlines {
  white-space: pre-wrap;
}
.width100 {
  width:100px;
}
.width125 {
  width:120px;
}
.width150 {
  width:150px;
}
.width200 {
  width:200px;
}
.width225 {
  width:225px;
}
.width245 {
  width:245px;
}
.width250 {
  width:250px;
}
li {
  list-style-type: none;
}

/* master body container */
#container {
  width: 90%;
  margin: 0 auto;
  text-align: center;
}

/* note page */
.note-form{
  padding-bottom: 20px;
}
.note-list{
  text-align: left;
}
textarea {
  margin:3px 0 8px 0;
  font-size: 1.3em;
  width:70%;
  height:85px;
  border:solid 1px #959595;
  border-radius: 4px;
}
.noteStyle {
  width:90%;
  padding:5px 7px;
  margin-bottom: 12px;
  border:solid 1px #d5d5d5;
  border-radius: 4px;
  margin-left:auto;
  margin-right:auto;
}
.noteDetails {
  width:99%;
  background-color:#eeeeee;
  margin-top: 6px;
  padding: 4px;
  border-radius: 2px;
  text-align:right;
  vertical-align: bottom;
}
.note-edit-form textarea{
  width:95%;
  height:500px;
  font-size: 1.0em;
}

.noteDetails button {
  background-color:#ffffff;
  height: 22px;
  vertical-align: middle;
  border-radius:3px;
  border:1px solid #124d77;
}

/* form page */

#form-container {
  width:280px;
  margin: 175px auto;
  padding: 60px;
  background-color:#eeeeee;
  border-radius: 4px;
  box-shadow: .5px .5px 2px;
}

.form-style {
  padding: 3px;
  border:solid 1px #d5d5d5;
  border-radius: 3px;
}
.form-input {
  padding: 5px
}
.form-error {
  color:red;
  font-size: 20px;
  margin-bottom: 20px
}
.text-basic {
  height:35px;
  font-size:20px;
  padding: 0 10px;
}

/* Buttons */
.acceptButton {
  background-color:#007dc1;
  border-radius:3px;
  border:1px solid #124d77;
  display:inline-block;
  color:#ffffff;
  font-family:arial;
  font-size:1.3em;
  height: 35px;
  padding:2px 24px;
  text-decoration:none;
}
.acceptButton:hover {
  background-color:#0061a7;
}
.acceptButton:active {
  position:relative;
  top:1px;
}
.button {
  background-color: #5584c0; /* blue */
  border: none;
  color: white;
  padding: 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}
.button-200 {
  width: 200px;
}
.button-300 {
  width: 300px;
}
input[type=text], input[type=password], select {
  width: 300px;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size:20px;
}
::placeholder {
  color: #9e9e9e;
  font-size: 16px;
}
.error {
  color: red;
  border: 1px solid red;
  border-radius: 3px;
  width: 300px;
}
.center-form {
  lost-center: 300px;
}
</style>

import { login_email, login_otp } from './api.js';
import { show_modal } from './modal.js';

const UUIDv4 = function b(a) { return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b) }

// ------------------------------
// on load
$(document).ready(function () {
	$("#modal_load").load("modal.html");
	start_page();
});

// ------------------------------
async function start_page() {

}

// ------------------------------
function hide_otp() {
	console.log(document.getElementById("show_otp"));
	var show_otp = document.getElementById("show_otp");
	if (show_otp.style.display === "none") {
		show_otp.style.display = "block";
	} else {
		show_otp.style.display = "none";
	}
};

// ------------------------------
// event handlers
$("#send_otp").click(function () {
	console.log("send_otp");
	login_email();
	hide_otp();
});

$("#login").click(function () {
	console.log("login");
	// dislpay modal
	$("#login_modal").modal('show');
	
	// add event handler to submit button
	// on email button click
	$("#login_email").click(function () {
		login_email($("#email").val());

		// add event handler for otp submit
		$("#otp_login").click(function () {
			$('#otp_login').attr("disabled", true);
			$('#cover-spin').show();
			login_otp($("#otp").val());
			$("#login_modal").modal('hide');
		});
	});

	
});

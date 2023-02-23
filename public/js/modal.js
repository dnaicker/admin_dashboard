
// ------------------------------
export function simpler_modal(header, body) {
	$("#simpler_modal_header")[0].innerHTML = header;
	$("#simpler_modal_body")[0].innerHTML = "<p style=''>" + body + "</p>";
	$("#simpler_modal").modal('show');
}

// ------------------------------
export function show_modal(header, body) {
	$("#modal_header")[0].innerHTML = header;
	$("#modal_body")[0].innerHTML = "<p style=''>" + body + "</p>";
	$("#modal").modal('show');
}

// ------------------------------
export function show_confirmation_modal(header, body, confirm_callback) {
	$("#confirmation_modal_header")[0].innerHTML = header;
	$("#confirmation_modal_body")[0].innerHTML = "<p>" + body + "</p>";
	$("#confirmation_modal").modal('show');
	$("#modal_button_confirm").on("click", function (e) {
		confirm_callback();
		$("#confirmation_modal").modal('hide');
	});
}

// ------------------------------
export function show_copy_modal(header, raw_data, body, callback) {
	$("#copy_modal_header")[0].innerHTML = header;
	$("#copy_modal_body")[0].innerHTML = "<div style='overflow-y: scroll; height: 300px;'>" + body + "</div>";
	$("#copy_button").attr("data-clipboard-text", JSON.stringify(raw_data));
	$("#copy_modal").modal('show');
	$("#copy_button").on("click", function (e, target, value) {
		callback(body);
	});
}

// ------------------------------
// function show_copy_modal(header, raw_data, body, callback) {
// 	$("#copy_modal_header")[0].innerHTML = header;
// 	$("#copy_modal_body")[0].innerHTML = "<div style='overflow-y: scroll; height: 300px;'>" + body + "</div>";
// 	$("#copy_button").attr("data-clipboard-text", JSON.stringify(raw_data));
// 	$("#copy_modal").modal('show');
// 	$("#copy_button").on("click", function (e, target, value) {
// 		callback(body);
// 	});
// }

// --------------------------------

export function OTPInput() {
	const inputs = document.querySelectorAll('#otp > *[id]');
	console.log('inputs',inputs);
	for (let i = 0; i < inputs.length; i++) {
			inputs[i].addEventListener('keydown', function(event) {
					if (event.key === "Backspace") {
							inputs[i].value = '';
							if (i !== 0)
									inputs[i - 1].focus();
					} else {
							if (i === inputs.length - 1 && inputs[i].value !== '') {
									return true;
							} else if (event.keyCode > 47 && event.keyCode < 58) {
									inputs[i].value = event.key;
									if (i !== inputs.length - 1)
											inputs[i + 1].focus();
									event.preventDefault();
							} else if (event.keyCode > 64 && event.keyCode < 91) {
									inputs[i].value = String.fromCharCode(event.keyCode);
									if (i !== inputs.length - 1)
											inputs[i + 1].focus();
									event.preventDefault();
							}
					}
			});
	}
}



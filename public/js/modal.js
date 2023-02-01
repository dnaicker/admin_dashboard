
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
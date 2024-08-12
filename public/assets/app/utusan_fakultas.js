let table;

showData();

function showData() {
    table = $("#datatable").DataTable({
        processing: true,
        serverSide: true,
        ajax: `/api/utusan/fakultas/${idFakultas}`,
        autoWidth: false,
        columnDefs: [
            {
                targets: -1,
                width: "150px",
            },
        ],
        columns: [
            {
                data: null,
                name: "id",
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                },
                orderable: true,
                searchable: false,
            },
            {
                data: "mahasiswa.nim",
                name: "mahasiswa.nim",
                orderable: true,
                searchable: true,
            },
            {
                data: "mahasiswa.nama",
                name: "mahasiswa.nama",
                orderable: true,
                searchable: true,
            },
            {
                data: "total_skor",
                name: "total_skor",
                orderable: true,
                searchable: true,
            },
            {
                data: "tanggal_utus_fakultas",
                name: "tanggal_utus_fakultas",
                orderable: true,
                searchable: true,
            },
            {
                data: "portal.periode",
                name: "portal.periode",
                orderable: true,
                searchable: true,
            },
            {
                data: null,
                className: "text-center",
                render: function (data, type, row) {
                    return `
                        <div class="row g-2 text-center">
                            <div class="col">
                                <a onclick="deleteModal('${row.id}','${row.mahasiswa.nama}')" class="btn btn-danger btn-sm"><i class="fa fa-x"></i> </a>
                            </div>
                        </div>
                    `;
                },
            },
        ],
        order: [[0, "desc"]],
    });
}

function reloadData() {
    if (table) {
        table.ajax.reload();
    }
}

function deleteModal(id, nama) {
    const modalHeader = "Batalkan Utusan";
    const modalBody = `Apakah Anda Yakin Menghapus (${nama}) dari Utusan Fakultas ?`;
    const modalFooter = `<a class="btn btn-danger btn-lg" onclick="updateTingkat('${id}')">Batalkan</a>`;
    showModal(modalHeader, modalBody, modalFooter);
}

function updateTingkat(id) {
    const tingkat = "departmen";
    let data = {
        tingkat: tingkat,
    };

    $.ajax({
        type: "PATCH",
        url: `/api/utusan/tingkat/${id}`,
        data: JSON.stringify(data),
        contentType: "application/json",
        headers: {
            "X-CSRF-TOKEN": csrfToken,
        },
        success: function (response) {
            const successMessage = response.message;
            showToastSuccessAlert(successMessage);
            closeModal();
            return reloadData();
        },
        error: function (err) {
            let errorResponse = err.responseJSON;
            const errorMessage = errorResponse.message;
            const errorData = errorResponse.data;
            showToastErrorAlert(errorMessage + `<br>(${errorData})`);
        },
    });
}
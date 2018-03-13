$("#userPhoto").change(function(){
        readURL(this);
        //other uploading proccess [server side by ajax and form-data ]
    });

function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#changebtn').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

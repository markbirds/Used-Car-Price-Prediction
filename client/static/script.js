$(document).ready(function(){
    $('#predict').click(function(){
        var transmission = $('#transmission').val()
        var fuel = $('#fuel').val()
        var owner = $('#owner').val()
        var year = $('#year').val()
        var km_driven = $('#km_driven').val().trim()
        if(transmission&&fuel&&owner&&year&&km_driven){
            if(km_driven>=0 && km_driven<=200000){
                $('#wait').html(
                    '<button class="btn btn-danger btn-lg">'+
                        '<span class="spinner-border spinner-border-lg"></span>'+
                        'Estimating price. Please wait.'+
                    '</button>'
                );
                $('#fill').text('');
                $.post('/predict',{
                    transmission: transmission,
                    fuel: fuel,
                    owner: owner,
                    year: year,
                    km_driven: km_driven
                },function(data,status){
                    console.log(status);
                    $('#wait').html('');
                    $('#price').val("Php "+data['estimated_price']);
                })
            }else{
                $('#fill').text('0-200,000 only.');
            }
        }else{
            $('#fill').text('Please fill out this field.');
        }

    });
});
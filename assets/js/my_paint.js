$(document).ready(function () {
    let draw,
        started = false,
        context,
        strokes = [],
        color = '#000000',
        last_color = null,
        tools = 'brush';



    $('#canvas').mousedown(function () {
        draw = true;
    });

    $('#canvas').mousemove(function (event) {
        let cursorX = event.pageX-this.offsetLeft;
        let cursorY = event.pageY-this.offsetTop;
        let width_brush = $('#brush_size').val();
        context = this.getContext("2d");
        $('#x').text('x : '+cursorX);
        $('#y').text('y : '+cursorY);
        $('#used_tools').text('tools : '+tools);

        if (draw) {
            if (tools == "brush") {
                if (!started) {
                    context.beginPath();
                    context.moveTo(cursorX, cursorY);
                    started = true;
                }
                else {
                    context.lineTo(cursorX, cursorY);
                    context.strokeStyle = color;
                    context.lineWidth = width_brush;
                    context.lineCap = "round";
                    context.stroke();

                }
            }
            else if (tools == "line") {

            }
        }
    });

    $(this).one('mouseover',function f() {
        $('#canvas').trigger('mousemove');
        clean(context);
    });

    $(this).mouseup(function () {
        draw = false;
        started = false;
    });

    $('#color_picker').on('input',function () {
        color = this.value;
        last_color = null;
        $('#canvas').removeClass('erase');
    });

    $('#brush_size').on('input',function () {
       $('#brush_info').val(this.value + ' pixels');
    });

    $('#clear').click(function () {
        clean(context);
    });

    $('#undo').click(function () {
    });

    $('#save').click(function () {
        console.log($('#canvas')[0].toDataURL("image/jpeg"));
        window.open($('#canvas')[0].toDataURL("image/jpeg",0.1));
    });

    $('#erease').click(function () {
        if (!last_color) {
            last_color = color;
            color = "#f5f5f5";
            $('#color_picker').val(color);
            $('#canvas').addClass('erase');
        }
        else {
            color = last_color;
            $('#color_picker').val(color);
            $('#canvas').removeClass('erase');
            last_color = null;

        }
    });

    $('#brush').click(function () {
        tools = "brush";
    });

    $('#line').click(function () {
        tools = "line";
    });
});

function clean(context) {
    context.clearRect(0,0, $('#canvas').width(), $('#canvas').height());
    context.fillStyle="#f5f5f5";
    context.fillRect(0,0,$('#canvas').width(), $('#canvas').height());
}
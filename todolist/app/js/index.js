const maxLength = 60;

$(document).ready(function () {
    //Select of an icon in the form
    $(".pick-icon").click(function () {
        $("#selected-icon").replaceWith($(this).clone());
        $("#form-btn a:first-child").removeClass("pick-icon").attr("id", "selected-icon");
    });

    function calculatePercentageLeft() {
        var length = $("#content").val().length;
        $(".determinate").css("width", length/maxLength*100 + "%");
    }

    //Update progress bar when character when change
    $("#content").on("change keyup paste", function() {
        calculatePercentageLeft();
    });

    function constructTask(title, content, icon) {
        var task = $("<li></li>").addClass("collection-item avatar");
        //Icon
        task.append(icon.addClass("circle"));
        //Title
        task.append($("<strong></strong>").addClass("title").text(title));
        //Content
        task.append($("<p></p>").addClass("content").text(content));
        //Edit and Delete
        task.append(
            $("<div></div>").addClass("secondary-content")
                .append($("<a></a>").addClass("editButton material-icons").text("create"))
                .append($("<a></a>").addClass("deleteButton material-icons").text("clear"))
        );
         $("#todolist").prepend(task);

    }
    //Event when form is submited
    $("#task-form").submit(function() {
        // if($("#title").val() !== "" && $("#content").val() !== "" && $("#form-btn a:first-child i").text() !== "") {
            constructTask($("#title").val(), $("#content").val(), $("#form-btn a:first-child i") );
        // }


        $("a.deleteButton").click(function() {
            $(this).parent().parent().remove();
        });

        $("a.editButton").click(function() {
            console.log("cc");
            $(this).parent().parent().empty()
                .append("<form id='editForm'>" +
                "<input value='"+ $(".title").text() + "' type='text' />" +
                "<input value='" + $(".content").text() +"' type='text' maxlength='60' />" +
                "</form>");

            $("#editForm").submit(function() {
                if($("#editForm input:first-child").val() !== "" && $("#editForm input:last-child").val() !== "") {
                    constructTask($("#editForm input:first-child").val(), $("#editForm input:last-child").val(), "clear")
                }
                return false;
            });
        });
        return false;
    });

});
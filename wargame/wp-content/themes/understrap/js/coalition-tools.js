jQuery(document).ready(function($){



  $(function(){
    $('[data-toggle="tooltip"]').tooltip()
  });



  function PinForComparison( postid )
  {
    // detach pinned post
    var pinned_post = $( '.coalition-' + postid ).detach();
    $('.col-post-' + postid).css('display', 'none');


    // restructure the grid to accommodate
    $('body').addClass('pinned-post-active');
    $('.coalition-col').removeClass('col-lg-4');
    $('.coalition-col').addClass('col-lg-6');


    // create a container for the pinned post
    var pinned_post_container = $('<div/>', {
      'class' : 'pinned-post-container container container-larger'
    }).appendTo( $('body') );

    var pinned_post_row = $('<div/>', {
      'class' : 'pinned-post-row row row-more-spacing coalitions-row'
    }).appendTo( pinned_post_container );

    var pinned_post_column = $('<div/>', {
      'class' : 'pinned-post-col coalition-col col-lg-4 offset-lg-8'
    }).appendTo( pinned_post_row );

    var pinned_post_close_btn = $('<a/>', {
      'href' : '#',
      'class' : 'pinned-post-close-btn'
    }).appendTo( pinned_post_column );

    var pinned_post_close_icon = $('<i/>', {
      'class' : 'fa fa-close'
    }).appendTo( pinned_post_close_btn );


    // append pinned post to the container
    pinned_post.appendTo( pinned_post_column );
    pinned_post.addClass('pinned-post');


    // run the comparison
    RunComparison( pinned_post );

    // handle close button
    $('.pinned-post-close-btn').click(function(e){
      console.log('close button clicked!');
      e.preventDefault();
      UnPin();
    });
  }



  function UnPin()
  {
    // detach the pinned post
    var pinned_postid = $('.pinned-post').attr('data-postid');
    var pinned_post = $('.pinned-post').detach();

    // return page structure to normal
    $('body').removeClass('pinned-post-active');
    $('.coalition-col').removeClass('col-lg-6');
    $('.coalition-col').addClass('col-lg-4');

    // delete the pinned post container and stat comparisons
    $('.pinned-post-container').remove();
    $('.stat-comparison').remove();
    $('.unit-stat').removeClass('comparison-better');
    $('.unit-stat').removeClass('comparison-same');
    $('.unit-stat').removeClass('comparison-worse');

    // append pinned post back to its normal slot
    pinned_post.appendTo( $('.col-post-' + pinned_postid) );
    $('.col-post-' + pinned_postid).css('display', 'block');
    pinned_post.removeClass('pinned-post');
  }



  function RunComparison( post )
  {
    // get reference stats
    var reference_stats = new Array();
    $( post ).find('.unit-stat').each(function(){
      reference_stats.push( $(this).attr('data-stat-value') );
    });


    // loop through other posts
    $('.coalition:not(.pinned-post)').each(function(){


      // loop through each stat
      var i = 0;
      $(this).find('.unit-stat').each(function(){


        // compare
        var this_element = $(this);
        var this_stat = this_element.attr('data-stat-value');
        var difference = this_stat - reference_stats[i];


        // format the result
        difference = Math.round( difference * 10 ) / 10;

        var color_class = '';
        if( difference > 0 ) {
          color_class = 'comparison-better';
        }
        else if( difference < 0 ) {
          color_class = 'comparison-worse';
        }
        else {
          color_class = 'comparison-same';
        }

        if( Number.isInteger( difference ) ) {
          difference += '.0';
        }
        if( color_class == 'comparison-better' ) {
          difference = '+' + difference;
        }


        // append comparison to the stat icon cell
        var difference_element = $('<span/>', {
          'class' : 'stat-comparison'
        }).appendTo( this_element.children('.unit-stat-cell.icon') );
        difference_element.text( difference );


        // append color class to the parent element
        $( this_element ).addClass( color_class );


        // increment loop count
        i++;
      });
    });
  }



  $('.btn-pin-tool').click(function(e){
    e.preventDefault();
    var postid = $(this).attr('data-postid');
    PinForComparison( postid );
  });



  $('.btn-comp-tool').click(function(e){
    e.preventDefault();
  });

});
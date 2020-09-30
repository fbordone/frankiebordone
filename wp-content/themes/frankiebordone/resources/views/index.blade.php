@extends('layouts.app')

@section('content')

  @if (!have_posts())
    <div class="alert alert-warning">
      {{ __('Sorry, no results were found.', 'frankiebordone') }}
    </div>
  @endif

  @while (have_posts()) @php the_post() @endphp
    <h1>{{ the_title() }}</h1>
    <p>{{ the_content() }}</p>
  @endwhile

@endsection

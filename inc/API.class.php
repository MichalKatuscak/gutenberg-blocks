<?php

namespace KatuscakGutenberg;

class API
{
    private $namespace;

    public function __construct()
    {
        $this->namespace = 'katuscak-gutenberg';
    }

    public function init()
    {
        add_action('rest_api_init', function () {
            register_rest_route(
                $this->namespace,
                '/users',
                [
                    'methods' => 'GET',
                    'callback' => [$this, 'getUsers'],
                ]
            );
        });
    }

    public function getUsers()
    {
        $users = [];
        $result = get_users(['fields' => ['display_name', "ID"]]);

        foreach ($result as $user) {
            $users[] = [
                'value' => $user->ID,
                'label' => $user->display_name,
            ];
        }

        return $users;
    }
}